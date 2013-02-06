var request = require('request'),
  xtend = require('xtend'),
  parseLinks = require('parse-links'),
  url = require('url');

var api = module.exports;
var Connection = require('./Connection');

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

api.getSocialUsers = function (accessToken, options, done) {
  if(typeof options === 'function'){
    done = options;
    options = {};
  }
  options = xtend({social: true}, options); 
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
}

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