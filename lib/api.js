var request = require('request'),
  xtend = require('xtend'),
  parseLinks = require('parse-links'),
  url = require('url');

var api = module.exports;
var Connection = require('./Connection');

api.getRule = function(accessToken, ruleName, done) {
 request.get({
  url: this.apiUrl + '/rules/' + ruleName,
  qs: { access_token: accessToken },
  headers: {"Accept": "application/xml" },
 }, function(err,r,body) {
    if( err ) return done(err);
    if (r.statusCode.toString().substr(0, 1) !== '2'){
      return done(new Error(body));
    }
    return done(null, body);
 });
}

api.getRules = function(accessToken, done) {
 request.get({
  url: this.apiUrl + '/rules',
  qs: { access_token: accessToken },
  headers: {"Accept": "application/xml" },
 }, function(err,r,body) {
    if( err ) return done(err);
    if (r.statusCode.toString().substr(0, 1) !== '2'){
      return done(new Error(body));
    }
    return done(null, body);
 });
}

api.updateRule = function(accessToken, rule, done) {
request.put({
    url:  this.apiUrl + '/rules/' + rule.name,
    qs:   { access_token: accessToken },
    json: rule
  }, function (err, r, body) {
    if (err) { return done(err); }
    if(r.statusCode === 400) {
      return done(new Error(body.detail || body));
    }
    done(null, body);
  });
}

api.deleteRule = function(accessToken, ruleName, done) {
request.del({
    url: this.apiUrl + '/rules/' + ruleName,
    qs: { access_token: accessToken }
  }, function (err, r, body) {
    if (err) return done(err);
    if (r.statusCode === 404) return done(null, null);
    if (r.statusCode.toString().substr(0, 1) !== '2') return done(new Error(body));
    done();
  });
}

api.createRule = function(accessToken, rule, done) {
request.post({
          url:  this.apiUrl + '/rules',
          qs:   { access_token: accessToken },
          json: rule
        },
        function (err, resp, body) {
          if (err) return done(err);
          done(null, body);
        }.bind(this));
}

api.getConnections = function(accessToken, done) {
  request.get({
    url: this.apiUrl + '/connections',
    qs: { access_token: accessToken },
    headers: {"Accept": "application/xml"},
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

api.getSocialConnections = function(accessToken, done) {
  request.get({
    url: this.apiUrl + '/connections',
    qs: { access_token: accessToken, only_socials: true },
    headers: {"Accept": "application/xml"}
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

api.getEnterpriseConnections = function(accessToken, done) {
  request.get({
    url: this.apiUrl + '/connections',
    qs: { 
      access_token: accessToken, 
      only_enterprise: true 
    },
    headers: {"Accept": "application/xml"}
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

  if(nextPageLink){
    req = { url: url.parse(nextPageLink) };
  }else {
    req = { qs: xtend({ access_token: accessToken }, options) };
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
    if (err) return done(err);
    
    if (r.statusCode.toString().substr(0, 1) !== '2'){
      return done(new Error(body));
    }

    try {
      var results = JSON.parse(body);
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
      done(null, results);
    } catch(e) {
      done(e);
    }

  });
};

api.updateTemplate = function (accessToken, strategy, options, done) {
  request.put({
    url: this.apiUrl + '/connection-templates/' + strategy,
    qs: { access_token: accessToken },
    json: options
  }, function (err, r, body) {
    if (err) return done(err); 
    if(r.statusCode === 400) {
      return done(new Error(body.detail || body));        
    }
    if (r.statusCode.toString().substr(0, 1) !== '2') return done(new Error(body));
    done();
  });
};

api.getTemplate = function (accessToken, strategy, done) {
  request.get({
    url: this.apiUrl + '/connection-templates/' + strategy,
    qs: { access_token: accessToken }
  }, function (err, r, body) {
    if (err) return done(err); 
    if (r.statusCode.toString().substr(0, 1) !== '2') return done(new Error(body));
    done(null, JSON.parse(body));
  });
};

api.deleteTemplate = function (accessToken, strategy, done) {
  request.del({
    url: this.apiUrl + '/connection-templates/' + strategy,
    qs: { access_token: accessToken }
  }, function (err, r, body) {
    if (err) return done(err); 
    if (r.statusCode.toString().substr(0, 1) !== '2') return done(new Error(body));
    done();
  });
};

api.getStrategies = function (accessToken, done) {
  request.get({
    url: this.apiUrl + '/strategies',
    qs: { access_token: accessToken }
  }, function (err, r, body) {
    if (err) return done(err); 
    if (r.statusCode.toString().substr(0, 1) !== '2') return done(new Error(body));
    done(null, JSON.parse(body));
  });
};

api.getConnection = function(accessToken, name, done) {
  request.get({
    url: this.apiUrl + '/connections/' + name,
    qs: { access_token: accessToken }
  }, function (err, r, body) {
    if (err) return done(err); 
    if (r.statusCode === 404) return done(null, null);
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

api.deleteConnection = function(accessToken, name, done)
{
  request.del({
    url: this.apiUrl + '/connections/' + name,
    qs: { access_token: accessToken }
  }, function (err, r, body) {
    if (err) return done(err); 
    if (r.statusCode === 404) return done(null, null);
    if (r.statusCode.toString().substr(0, 1) !== '2') return done(new Error(body));

    try {
      var data = JSON.parse(body);
      done(null, data);
    } catch(e) {
      done(e);
    }
  }.bind(this));
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

api.deleteTenant = function (accessToken, name, done) {
  request.del({
    url: this.apiUrl + '/tenants/' + name,
    qs: { access_token: accessToken }
  }, function (err, r, body) {
    if (err) return done(err); 
    if (r.statusCode === 404) return done(null, null);
    if (r.statusCode.toString().substr(0, 1) !== '2') return done(new Error(body));
    done();
  }.bind(this));
};

api.createClient = function (accessToken, options, done) {
  request.post({
    url:  this.apiUrl + '/clients',
    qs:   { access_token: accessToken },
    json: options
  }, function (err, r, body) {
    if (err) return done(err);
    if (r.statusCode === 404) return done();
    if (r.statusCode.toString().substr(0, 1) !== '2') return done(new Error(body.detail || body));

    done(null, body);
  });
};

api.updateClient = function (accessToken, client, done) {
  request.put({
    url:  this.apiUrl + '/clients/' + client.clientID,
    qs:   { access_token: accessToken },
    json: client
  }, function (err, r, body) {
    if (err) { return done(err); }
    if (r.statusCode.toString().substr(0, 1) !== '2') return done(new Error(body.detail || body));

    done(null, body);
  });
};

api.deleteClient = function (accessToken, clientID, done) {
  request.del({
    url: this.apiUrl + '/clients/' + clientID,
    qs: { access_token: accessToken }
  }, function (err, r, body) {
    if (err) return done(err);
    if (r.statusCode === 404) return done();
    if (r.statusCode.toString().substr(0, 1) !== '2') return done(new Error(body));
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
    qs: { access_token: accessToken }
  }, function (err, r, body) {
    if (err) return done(err); 
    if (r.statusCode.toString().substr(0, 1) !== '2') return done(new Error(body));
    done(null, JSON.parse(body));
  });
};

api.getClientsByUserId = function (accessToken, userId, done) {
  request.get({
    url: this.apiUrl + '/clients/?userId=' + userId,
    qs: { access_token: accessToken }
  }, function (err, r, body) {
    if (err) return done(err); 
    if (r.statusCode.toString().substr(0, 1) !== '2') return done(new Error(body));
    done(null, JSON.parse(body));
  });
};
