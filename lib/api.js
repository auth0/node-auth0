var request     = require('request');
var xtend       = require('xtend');
var parseLinks  = require('parse-links');
var url         = require('url');

var api         = module.exports;
var Connection  = require('./Connection');
var ApiError    = require('./errors/ApiError');

function authRequest(accessToken) {
  if (accessToken && typeof accessToken === 'string') {
    return request.defaults({
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
  } else {
    throw 'Access token must be a non-empty string';
  }
}
api.getRule = function(accessToken, ruleName, done) {
  authRequest(accessToken).get({
    url: this.apiUrl + '/rules/' + ruleName
  }, function(err,r,body) {
    if( err ) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2'){
      return done(new ApiError(body, r.statusCode));
    }
    return done(null, body);
  });
};

api.getRules = function(accessToken, done) {
  authRequest(accessToken).get({
    url: this.apiUrl + '/rules'
  }, function(err,r,body) {
    if( err ) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2'){
      return done(new ApiError(body, r.statusCode));
    }
    return done(null, body);
  });
};

api.updateRule = function(accessToken, rule, done) {
  authRequest(accessToken).put({
    url:  this.apiUrl + '/rules/' + rule.name,
    json: rule
  }, function (err, r, body) {
    if (err) { return done(err); }
    if(r.statusCode === 400) {
      return done(new ApiError(body, r.statusCode));
    }
    done(null, body);
  });
};

api.deleteRule = function(accessToken, ruleName, done) {
  authRequest(accessToken).del({
    url: this.apiUrl + '/rules/' + ruleName
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode === 404) { return done(null, null); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done();
  });
};

api.createRule = function(accessToken, rule, done) {
  authRequest(accessToken).post({
    url:  this.apiUrl + '/rules',
    json: rule
  },
  function (err, resp, body) {
    if (err) { return done(err); }
    done(null, body);
  }.bind(this));
};

api.getConnections = function(accessToken, done) {
  authRequest(accessToken).get({
    url: this.apiUrl + '/connections'
  }, function (err, r, body) {
    if (err) { return done(err); }
    var result;

    if (r.statusCode.toString().substr(0, 1) !== '2'){
      return done(new ApiError(body, r.statusCode));
    }

    try {
      result = JSON.parse(body).map(function(c) {
        return new Connection(this, accessToken, c);
      });
    } catch(e) {
      return done(e);
    }

    done(null, result);

  }.bind(this));
};

api.getSocialConnections = function(accessToken, done) {
  authRequest(accessToken).get({
    url: this.apiUrl + '/connections',
    qs: { only_socials: true }
  }, function (err, r, body) {
    if (err) { return done(err); }
    var result;

    if (r.statusCode.toString().substr(0, 1) !== '2'){
      return done(new ApiError(body, r.statusCode));
    }

    try {
      result = JSON.parse(body).map(function(c) {
        return new Connection(this, accessToken, c);
      });
    } catch(e) {
      return done(e);
    }

    done(null, result);
  }.bind(this));
};

api.getEnterpriseConnections = function(accessToken, done) {
  authRequest(accessToken).get({
    url: this.apiUrl + '/connections',
    qs: { only_enterprise: true }
  }, function (err, r, body) {
    if (err) { return done(err); }
    var result;

    if (r.statusCode.toString().substr(0, 1) !== '2'){
      return done(new ApiError(body, r.statusCode));
    }
    try {
      result = JSON.parse(body).map(function(c) {
        return new Connection(this, accessToken, c);
      });
    } catch(e) {
      return done(e);
    }

    done(null, result);
  }.bind(this));
};

api.getSocialUsers = function (accessToken, options, done) {
  if(typeof options === 'function'){
    done = options;
    options = {};
  }
  options = xtend({social: true}, options);
  return api.getUsers.bind(this)(accessToken, options, done);
};


api.getEnterpriseUsers = function (accessToken, options, done) {
  if(typeof options === 'function'){
    done = options;
    options = {};
  }
  options = xtend({social: false}, options);
  return api.getUsers.bind(this)(accessToken, options, done);
};

api.getUser = function(accessToken, userId, cb) {
  var options = {
    url: this.apiUrl + '/users/' + userId
  };

  authRequest(accessToken).get(options, function(err, res, data) {
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

api.getUserBySearch = function(accessToken, searchCriteria, cb) {
  var options = {
    url: this.apiUrl + '/users?search=' + searchCriteria
  };

  authRequest(accessToken).get(options, function(err, res, data) {
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

api.createUser = function(accessToken, userData, done) {
  var options = {
    url: this.apiUrl + '/users/',
    json: userData
  };

  authRequest(accessToken).post(options, function (err, res, body) {
    if (err) { return done(err); }

    if (res.statusCode === 404) { return done(); }

    if (res.statusCode.toString().substr(0, 1) !== '2') {
      return done(new ApiError(body.detail || body, res.statusCode));
    }

    done(null, body);
  });
};

api.updateUserEmail = function(accessToken, userId, email, verify, cb) {
  var options = {
    url: this.apiUrl + '/users/' + userId + '/email',
    json: {
      'email': email,
      'verify': !!verify
    }
  };

  authRequest(accessToken).put(options, function(err, res, data) {
    if (err) {
      return cb(err);
    }

    if (res.statusCode.toString().substr(0, 1) !== '2') {
      return cb(new ApiError(data, res.statusCode));
    }

    return cb(null, data);
  });
};

api.updateUserPassword = function(accessToken, userId, newPassword, verify, cb) {
  var options = {
    url: this.apiUrl + '/users/' + userId + '/password',
    json: {
      'password': newPassword,
      'verify': !!verify
    }
  };

  authRequest(accessToken).put(options, function(err, res, data) {
    if (err) {
      return cb(err);
    }

    if (res.statusCode.toString().substr(0, 1) !== '2') {
      return cb(new ApiError(data, res.statusCode));
    }

    return cb(null, data);
  });
};

api.getUserMetadata = function(accessToken, userId, cb) {
  var options = {
    url: this.apiUrl + '/users/' + userId + '/metadata'
  };

  authRequest(accessToken).get(options, function(err, res, data) {
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

// TODO Validate metadata argument
api.updateUserMetadata = function(accessToken, userId, metadata, cb) {
  var options = {
    url: this.apiUrl + '/users/' + userId + '/metadata',
    json: metadata
  };

  authRequest(accessToken).put(options, function(err, res, data) {
    if (err) {
      return cb(err);
    }

    if (res.statusCode.toString().substr(0, 1) !== '2') {
      return cb(new ApiError(data, res.statusCode));
    }

    return cb();
  });
};

// TODO Validate metadata argument
api.patchUserMetadata = function(accessToken, userId, metadata, cb) {
  var options = {
    url: this.apiUrl + '/users/' + userId + '/metadata',
    json: metadata
  };

  authRequest(accessToken).patch(options, function(err, res, data) {
    if (err) {
      return cb(err);
    }

    if (res.statusCode.toString().substr(0, 1) !== '2') {
      return cb(new ApiError(data, res.statusCode));
    }

    return cb();
  });
};

api.deleteUser = function(accessToken, userId, cb) {
  var options = {
    url: this.apiUrl + '/users/' + userId
  };

  authRequest(accessToken).del(options, function(err, res, data) {
    if (err) {
      return cb(err);
    }

    if (res.statusCode.toString().substr(0, 1) !== '2') {
      return cb(new ApiError(data, res.statusCode));
    }

    return cb();
  });
};

api.impersonateUser = function(accessToken, userId, options, cb) {
  var req = {
    url: this.baseUrl + '/users/' + userId + '/impersonate',
    json: options
  };

  authRequest(accessToken).post(req, function(err, res, data) {
    if (err) {
      return cb(err);
    }

    if (res.statusCode.toString().substr(0, 1) !== '2') {
      return cb(new ApiError(data, res.statusCode));
    }

    return cb(null, data);
  });
};

api.getUsers = function(accessToken, options, done) {
  var nextPageLink, req, connection;

  if(typeof options === 'function'){
    done = options;
    options = {};
  }else{
    options = options || {};
    if(options.perPage){
      options.per_page = options.perPage;
      delete options.perPage;
    }
    if(options.page){
      nextPageLink = options.page;
      delete options.page;
    }
    if(options.connection){
      connection = options.connection;
      delete options.connection;
    }
  }

  // nextPageLink already includes a token. It only works for that URL for a
  // brief period of time (see hawk bewit)
  if(nextPageLink){
    req = { url: url.parse(nextPageLink) };
  }else {
    req = {
      headers: { 'Authorization': 'Bearer ' + accessToken},
      qs: options
    };
    if (connection) {
      req.url = this.apiUrl + '/connections/' + connection + '/users';
    } else if (options.social) {
      req.url = this.apiUrl + '/socialconnections/users';
      delete options.social;
    } else if (options.social === false) {
      req.url = this.apiUrl + '/enterpriseconnections/users';
      delete options.social;
    } else {
      req.url = this.apiUrl + '/users';
    }
  }

  request.get(req, function (err, r, body) {
    if (err) { return done(err); }

    if (r.statusCode.toString().substr(0, 1) !== '2'){
      return done(new ApiError(body, r.statusCode));
    }

    var results;

    try {
      results = JSON.parse(body);
      if(r.headers.link){

        var links = parseLinks(r.headers.link);

        if(links.next){
          Object.defineProperty(results, 'nextPageLink' , {
            enumerable: false,
            writeable: false,
            value: links.next
          });
        }

      }
    } catch(e) {
      return done(e);
    }

    return done(null, results);
  });
};

api.updateTemplate = function (accessToken, strategy, options, done) {
  authRequest(accessToken).put({
    url: this.apiUrl + '/connection-templates/' + strategy,
    json: options
  }, function (err, r, body) {
    if (err) { return done(err); }
    if(r.statusCode === 400) {
      return done(new ApiError(body, 400));
    }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done();
  });
};

api.getTemplate = function (accessToken, strategy, done) {
  authRequest(accessToken).get({
    url: this.apiUrl + '/connection-templates/' + strategy
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done(null, JSON.parse(body));
  });
};

api.deleteTemplate = function (accessToken, strategy, done) {
  authRequest(accessToken).del({
    url: this.apiUrl + '/connection-templates/' + strategy
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done();
  });
};

api.getStrategies = function (accessToken, done) {
  authRequest(accessToken).get({
    url: this.apiUrl + '/strategies'
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done(null, JSON.parse(body));
  });
};

api.getConnection = function(accessToken, name, done) {
  authRequest(accessToken).get({
    url: this.apiUrl + '/connections/' + name
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode === 404) { return done(null, null); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    var connection;

    try {
      var data = JSON.parse(body);
      connection = new Connection(this, accessToken, data);
    } catch(e) {
      return done(e);
    }

    done(null, connection);

  }.bind(this));
};

api.createConnection = function (accessToken, connection, done) {
  authRequest(accessToken).post({
    url:  this.apiUrl + '/connections',
    json: connection
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done(null, body);
  });
};

api.deleteConnection = function(accessToken, name, done)
{
  authRequest(accessToken).del({
    url: this.apiUrl + '/connections/' + name
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode === 404) { return done(null, null); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    var data;

    try {
      data = JSON.parse(body);
    } catch(e) {
      return done(e);
    }

    done(null, data);
  }.bind(this));
};

api.updateConnection = function (accessToken, connection, done) {
  authRequest(accessToken).put({
    url:  this.apiUrl + '/connections/' + connection.name,
    json: connection
  }, function (err, r, body) {
    if (err) { return done(err); }
    if(r.statusCode === 400) {
      return done(new ApiError(body, 400));
    }
    done(null, body);
  });
};

api.deleteTenant = function (accessToken, name, done) {
  authRequest(accessToken).del({
    url: this.apiUrl + '/tenants/' + name
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode === 404) { return done(null, null); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done();
  }.bind(this));
};

api.createClient = function (accessToken, options, done) {
  authRequest(accessToken).post({
    url:  this.apiUrl + '/clients',
    json: options
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode === 404) { return done(); }
    if (r.statusCode.toString().substr(0, 1) !== '2') {
      return done(new ApiError(body, r.statusCode));
    }

    done(null, body);
  });
};

api.updateClient = function (accessToken, client, done) {
  authRequest(accessToken).put({
    url:  this.apiUrl + '/clients/' + client.clientID,
    json: client
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') {
      return done(new ApiError(body, r.statusCode));
    }

    done(null, body);
  });
};

api.deleteClient = function (accessToken, clientID, done) {
  authRequest(accessToken).del({
    url: this.apiUrl + '/clients/' + clientID
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode === 404) { return done(); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done();
  }.bind(this));
};

api.getClients = function (accessToken, clientID, done) {
  if (typeof clientID === 'function') {
    done = clientID;
    clientID = '';
  }

  authRequest(accessToken).get({
    url: this.apiUrl + '/clients/' + clientID
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done(null, JSON.parse(body));
  });
};

api.getClientsByUserId = function (accessToken, userId, done) {
  authRequest(accessToken).get({
    url: this.apiUrl + '/clients/?userId=' + userId
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done(null, JSON.parse(body));
  });
};

api.getLogs = function (accessToken, options, done) {
  var nextPageLink;

  if (typeof options === 'function') {
    done = options;
    options = {};
  } else {
    options = options || {};

    if (options.perPage) {
      options.per_page = options.perPage;
      delete options.perPage;
    }

    if (options.page) {
      nextPageLink = options.page;
      delete options.page;
    }
  }

  // nextPageLink already includes a token. It only works for that URL for a brief period of time (see hawk bewit)
  var req = nextPageLink ?
    { url: url.parse(nextPageLink) } :
    {
      url:      this.apiUrl + '/logs',
      qs:       options
    };

  authRequest(accessToken).get(req, function (err, r, body) {
    if (err) { return done(err); }

    if (r.statusCode.toString().substr(0, 1) !== '2') {
      return done(new ApiError(body, r.statusCode));
    }

    var results;

    try {
      results = JSON.parse(body);
      if (r.headers.link) {
        var links = parseLinks(r.headers.link);

        if (links.next) {
          Object.defineProperty(results, 'nextPageLink' , {
            enumerable: false,
            writeable: false,
            value: links.next
          });
        }

      }
    } catch(e) {
      return done(e);
    }

    return done(null, results);
  });
};
