var request = require('request'),
  xtend = require('xtend');

var api = module.exports;
var Connection = require('./Connection');

api.getConnections = function(accessToken, done) {
  request.get({
    url: this.apiUrl + '/connections',
    qs: { access_token: accessToken }
  }, function (err, r, body) {
    if (err) { return done(err); }
    
    if (r.statusCode.toString().substr(0, 1) !== '2'){
      return done(new Error(body));
    }

    try {
      var result = JSON.parse(body).map(function(c) {
        return new Connection(this, accessToken, c);
      });
      done(null, result);
    } catch(e) {
      done(e);
    }
  }.bind(this));
};

api.getUsers = function(accessToken, options, done) {
  
  if(typeof options === 'function'){
    done = options;
    options = {};
  }else{
    options = options || {};
  }

  request.get({
    url: this.apiUrl + '/users',
    qs: xtend({ access_token: accessToken }, options)
  }, function (err, r, body) {
    if (err) { return done(err); }
    
    if (r.statusCode.toString().substr(0, 1) !== '2'){
      return done(new Error(body));
    }

    try {
      var results = JSON.parse(body);
      done(null, results);
    } catch(e) {
      done(e);
    }

  });
};

api.getConnection = function(accessToken, name, done) {
  request.get({
    url: this.apiUrl + '/connections/' + name,
    qs: { access_token: accessToken }
  }, function (err, r, body) {
    if (err) return done(err); 
    if (r.statusCode === 404) return done( null, null);
    if (r.statusCode.toString().substr(0, 1) !== '2') return done(new Error(body));

    try {
      var data = JSON.parse(body);
      var connection = new Connection(this, accessToken, data);
      done(null, connection);
    } catch(e) {
      done(e);
    }
  }.bind(this));
};

api.createConnection = function (accessToken, connection, done) {
  request.post({
    url:  this.apiUrl + '/connections',
    qs:   { access_token: accessToken },
    json: connection 
  }, function (err, r, body) {
    if (err) { return done(err); }
    if(r.statusCode === 400) {
      return done(new Error(body.detail || body));        
    }
    done(null, body);
  });
};

api.updateConnection = function (accessToken, connection, done) {
  request.put({
    url:  this.apiUrl + '/connections/' + connection.name,
    qs:   { access_token: accessToken },
    json: connection 
  }, function (err, r, body) {
    if (err) { return done(err); }
    if(r.statusCode === 400) {
      return done(new Error(body.detail || body));        
    }
    done(null, body);
  });
};