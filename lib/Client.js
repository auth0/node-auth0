var request     = require('request');

var api         = require('./api');
var ApiError    = require('./errors/ApiError');

function Client(options) {

  var fieldsToValidate = !options.accessToken ?
    ['domain', 'clientID', 'clientSecret'] :
    ['domain'];

  fieldsToValidate.forEach(function (k) {
    if(!options[k]){
      throw new Error(k + ' is required');
    }
  });

  this.apiUrl =   'https://' + options.domain + '/api';
  this.baseUrl =   'https://' + options.domain;
  this.tokenUrl = 'https://' + options.domain + '/oauth/token';
  this.options = options;
}

Client.getAccessToken = function (options, done) {
  var body = {
    'client_id':     options.clientID,
    'client_secret': options.clientSecret,
    'grant_type':    'client_credentials'
  };

  var tokenUrl = 'https://' + options.domain + '/oauth/token';

  request.post({
    url:  tokenUrl,
    form: body
  }, function (err, resp, body) {

    if (err) return done(err);
    if (resp.statusCode === 404) return done(new ApiError('unknown client', 404));
    if (resp.statusCode.toString().substr(0, 1) !== '2') return done(new ApiError(body, resp.statusCode));

    var accessToken = JSON.parse(body)['access_token'];
    done(null, accessToken);
  });
};

/**
 * Gets user profile using a user's access token (not an app access token).
 *
 * @param {Object}    options Which should contain:
 *                              * userAccessToken: User's access token
 *                                whose data is going to be fetched.
 *                              * domain: Auth0 Tenant domain
 *                                (ie. my-domain.auth0.com
 * @param {function}  cb      Callback with signature function(err, profile)
 */
Client.getUserInfo = function(options, cb) {
  if (!options || !options.userAccessToken || !options.domain) {
    throw new Error('Options object should contain userAccessToken and ' +
                    'domain attributes');
  }
  var userInfoUrl = 'https://' + options.domain + '/userinfo';

  var requestOptions = {
    url: userInfoUrl + '?access_token=' + options.userAccessToken
  };

  request.get(requestOptions, function(err, res, data) {
    if (err) {
      return cb(err);
    }

    if (res.statusCode.toString().substr(0, 1) !== '2') {
      return cb(new ApiError(data, res.statusCode));
    }

    try {
      data = JSON.parse(data);
    } catch (e) {
      return cb(e);
    }

    return cb(null, data);
  });
};

Client.prototype.getAccessToken = function(done){
  var self = this;

  if (this._currentAccessToken) return done(null, this._currentAccessToken);

  return Client.getAccessToken(this.options, function (err, token) {
    if (err) return done(err);

    self._currentAccessToken = token;

    var timer = setTimeout(function () {
      delete self._currentAccessToken;
    }, 1000 * 60 * 3); //~ 3 minutes

    // unref method added in node 0.10.x
    if (timer && timer.unref) {
      // Make the timer active but if it's the only item left in the event loop
      // won't keep the program running.
      timer.unref();
    }

    // XXX: This is a workaround for node 0.8.x. (erase me when we
    // drop support for that version).
    // _accessTokenTimer is exposed so clients can do clearTimeout and
    // make the process end (as unref is not present in node 0.8.x)
    self._accessTokenTimer = timer;

    done(null, token);
  });
};

Object.keys(api).forEach(function (m) {
  Client.prototype[m] = function (){
    var args = [].slice.call(arguments);
    var callback = args[args.length - 1];

    if (this.options.accessToken) {
      api[m].apply(this, [this.options.accessToken].concat(args));
    }
    else {
      this.getAccessToken(function (err, accessToken) {
        if (err) return callback(err);
        api[m].apply(this, [accessToken].concat(args));
      }.bind(this));
    }
  };
});

module.exports = Client;
