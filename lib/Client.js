var request = require('request');
var api     = require('./api');

function Client(options) {

  ['clientID', 'clientSecret', 'domain'].forEach(function (k) {
    if(!options[k]){
      throw new Error(k + ' is required');
    }
  });

  this.apiUrl =   'https://' + options.domain + '/api';
  this.tokenUrl = 'https://' + options.domain + '/oauth/token';
  this.options = options;
}

Client.prototype._getAccessToken = function(done){
  var body = {
    'client_id':     this.options.clientID,
    'client_secret': this.options.clientSecret,
    'grant_type':    'client_credentials'
  };

  request.post({
    url: this.tokenUrl,
    form: body
  }, function (err, resp, body) {

    if(err) return done(err);
    if (resp.statusCode === 404) return done(new Error('unknown client'));
    var accessToken = JSON.parse(body)['access_token'];
    done(null, accessToken);
  });
};

Object.keys(api).forEach(function (m) {
  Client.prototype[m] = function (){
    var args = [].slice.call(arguments),
      callback = args[args.length - 1];

    this._getAccessToken(function (err, accessToken) {

      if (err) return callback(err);

      api[m].apply(this, [accessToken].concat(args));
    
    }.bind(this));

  };
});

module.exports = Client;