var request = require('request');

function Client(options) {
  ['clientID', 'clientSecret'].forEach(function (k) {
    if(!options[k]){
      throw new Error(k + ' is required');
    }
  });

  options.namespace = options.namespace || 'app.auth0.com';

  this.apiUrl =   'https://' + options.namespace + '/api';
  this.tokenUrl = 'https://' + options.namespace + '/oauth/token';
  this.options = options;
}

Client.prototype._getAccessToken = function(done){
  var body = {
    'client_id':     this.options.clientID,
    'client_secret': this.options.clientSecret,
    'type':          'web_server',
    'grant_type':    'client_credentials'
  };

  request.post({
    url: this.tokenUrl,
    form: body
  }, function (err, resp, body) {

    if(err) return done(err);
    var accessToken = JSON.parse(body)['access_token'];
    done(null, accessToken);
  });
};


Client.prototype.getConnections = function(done) {
  var self = this;
  this._getAccessToken(function (err, accessToken) {
    if (err) return done(err);
    request.get({
      url: self.apiUrl + '/connections',
      qs: { access_token: accessToken }
    }, function (err, r, body) {
      if (err) { return done(err); }
      try {
        var json = JSON.parse(body);
        done(null, json);
      } catch(e) {
        done(e);
      }
    });
  });
};

Client.prototype.getConnection = function(id, done) {
  var self = this;
  this._getAccessToken(function (err, accessToken) {
    if (err) return done(err);
    request.get({
      url: self.apiUrl + '/connections/' + id,
      qs: { access_token: accessToken }
    }, function (err, r, body) {
      if (err) return done(err); 

      if(r.statusCode === 404) return done( null, null);
      
      try {
        var json = JSON.parse(body);
        done(null, json);
      } catch(e) {
        done(e);
      }
    });
  });
};

Client.prototype.createConnection = function (connection, done) {
  var self = this;
  this._getAccessToken(function (err, accessToken) {
    if (err) return done(err);

    request.post({
      url:  self.options.apiUrl + '/connections',
      qs:   { access_token: accessToken },
      json: connection 
    }, function (err, r, body) {
      if (err) { return done(err); }
      if(r.statusCode === 400) {
        return done(new Error(body.detail));        
      }
      done(null, body);
    });
  });
};

module.exports = Client;
