var passport = require('passport');

module.exports = function(app) {
  app.get('/user',
    passport.authenticate('auth0', {
      failureRedirect: '/'
    }),
    function(req, res) {
      res.render('user', {
        user: req.user
      });
    });
}
