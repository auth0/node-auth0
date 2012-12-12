var request = require('request'),
  xtend = require('xtend');

function Connection (client, accessToken, data) {
  xtend(this, data);

  this.getUsers = function (done) {
    
    request.get({
      url: client.apiUrl + '/connections/' + this.name + '/users',
      qs: { access_token: accessToken }
    }, function (err, r, body) {
      if (err) { return done(err); }
      
      if (r.statusCode === 404) {
        return done(null, null);
      }

      if (r.statusCode.toString().substr(0, 1) !== '2'){
        return done(new Error(body));
      }

      try {
        var json = JSON.parse(body);
        done(null, json);
      } catch(e) {
        done(e);
      }
      
    });
  };
}


module.exports = Connection;