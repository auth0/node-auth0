var request     = require('request');
var xtend       = require('xtend');
var parseLinks  = require('parse-links');
var url         = require('url');

var api         = module.exports;
var Connection  = require('./Connection');
var ApiError    = require('./errors/ApiError');

api.getRule = function(accessToken, ruleName, done) {
  request.get({
    url: this.apiUrl + '/rules/' + ruleName,
    headers: {
      'Accept': 'application/xml',
      'Authorization': 'Bearer ' + accessToken
    },
  }, function(err,r,body) {
    if( err ) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2'){
      return done(new ApiError(body, r.statusCode));
    }
    return done(null, body);
  });
};

api.getRules = function(accessToken, done) {
  request.get({
    url: this.apiUrl + '/rules',
    headers: {
      'Accept': 'application/xml',
      'Authorization': 'Bearer ' + accessToken
    },
  }, function(err,r,body) {
    if( err ) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2'){
      return done(new ApiError(body, r.statusCode));
    }
    return done(null, body);
  });
};

api.updateRule = function(accessToken, rule, done) {
  request.put({
    url:  this.apiUrl + '/rules/' + rule.name,
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    json: rule
  }, function (err, r, body) {
    if (err) { return done(err); }
    if(r.statusCode === 400) {
      return done(new ApiError(body.detail || body, r.statusCode));
    }
    done(null, body);
  });
};

api.deleteRule = function(accessToken, ruleName, done) {
  request.del({
    url: this.apiUrl + '/rules/' + ruleName,
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode === 404) { return done(null, null); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done();
  });
};

api.createRule = function(accessToken, rule, done) {
  request.post({
    url:  this.apiUrl + '/rules',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    json: rule
  },
  function (err, resp, body) {
    if (err) { return done(err); }
    done(null, body);
  }.bind(this));
};

api.getConnections = function(accessToken, done) {
  request.get({
    url: this.apiUrl + '/connections',
    headers: {
      'Accept': 'application/xml',
      'Authorization': 'Bearer ' + accessToken
    },
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
  request.get({
    url: this.apiUrl + '/connections',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Accept': 'application/xml'
    },
    qs: { only_socials: true },
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
  request.get({
    url: this.apiUrl + '/connections',
    qs: { only_enterprise: true },
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Accept': 'application/xml'
    }
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
    url: this.apiUrl + '/users/' + userId,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    }
  };

  request.get(options, function(err, res, data) {
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
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
    json: userData
  };

  request.post(options, function (err, res, body) {
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
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
    json: {
      'email': email,
      'verify': !!verify
    },
  };

  request.put(options, function(err, res, data) {
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
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
    json: {
      'password': newPassword,
      'verify': !!verify
    },
  };

  request.put(options, function(err, res, data) {
    if (err) {
      return cb(err);
    }

    if (res.statusCode.toString().substr(0, 1) !== '2') {
      return cb(new ApiError(data, res.statusCode));
    }

    return cb(null, data);
  });
};

api.updateUserMetadata = function(accessToken, userId, metadata, cb) {
  var options = {
    url: this.apiUrl + '/users/' + userId + '/metadata',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
    json: metadata,
  };

  request.put(options, function(err, res, data) {
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
    method: 'DELETE',
    url: this.apiUrl + '/users/' + userId,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  };

  request(options, function(err, res, data) {
    if (err) {
      return cb(err);
    }

    if (res.statusCode.toString().substr(0, 1) !== '2') {
      return cb(new ApiError(data, res.statusCode));
    }

    return cb();
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
  request.put({
    url: this.apiUrl + '/connection-templates/' + strategy,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
    json: options
  }, function (err, r, body) {
    if (err) { return done(err); }
    if(r.statusCode === 400) {
      return done(new ApiError(body.detail || body, 400));
    }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done();
  });
};

api.getTemplate = function (accessToken, strategy, done) {
  request.get({
    url: this.apiUrl + '/connection-templates/' + strategy,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    }
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done(null, JSON.parse(body));
  });
};

api.deleteTemplate = function (accessToken, strategy, done) {
  request.del({
    url: this.apiUrl + '/connection-templates/' + strategy,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    }
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done();
  });
};

api.getStrategies = function (accessToken, done) {
  request.get({
    url: this.apiUrl + '/strategies',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    }
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done(null, JSON.parse(body));
  });
};

api.getConnection = function(accessToken, name, done) {
  request.get({
    url: this.apiUrl + '/connections/' + name,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    }
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
  request.post({
    url:  this.apiUrl + '/connections',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
    json: connection
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body.detail || body, r.statusCode)); }
    done(null, body);
  });
};

api.deleteConnection = function(accessToken, name, done)
{
  request.del({
    url: this.apiUrl + '/connections/' + name,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    }
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
  request.put({
    url:  this.apiUrl + '/connections/' + connection.name,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
    json: connection
  }, function (err, r, body) {
    if (err) { return done(err); }
    if(r.statusCode === 400) {
      return done(new ApiError(body.detail || body, 400));
    }
    done(null, body);
  });
};

api.deleteTenant = function (accessToken, name, done) {
  request.del({
    url: this.apiUrl + '/tenants/' + name,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    }
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode === 404) { return done(null, null); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done();
  }.bind(this));
};

api.createClient = function (accessToken, options, done) {
  request.post({
    url:  this.apiUrl + '/clients',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
    json: options
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode === 404) { return done(); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body.detail || body, r.statusCode)); }

    done(null, body);
  });
};

api.updateClient = function (accessToken, client, done) {
  request.put({
    url:  this.apiUrl + '/clients/' + client.clientID,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
    json: client
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body.detail || body, r.statusCode)); }

    done(null, body);
  });
};

api.deleteClient = function (accessToken, clientID, done) {
  request.del({
    url: this.apiUrl + '/clients/' + clientID,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    }
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

  request.get({
    url: this.apiUrl + '/clients/' + clientID,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    }
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done(null, JSON.parse(body));
  });
};

api.getClientsByUserId = function (accessToken, userId, done) {
  request.get({
    url: this.apiUrl + '/clients/?userId=' + userId,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    }
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') { return done(new ApiError(body, r.statusCode)); }
    done(null, JSON.parse(body));
  });
};
