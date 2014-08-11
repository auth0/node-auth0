var passport = require('passport');

module.exports = function(app) {
  // Auth0 callback handler
  app.get('/callback',
    passport.authenticate('auth0'),
    function(req, res) {
      res.redirect("/user");
    });

}
