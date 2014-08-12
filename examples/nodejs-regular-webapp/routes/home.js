var login = require('./middlewares/login')

module.exports = function(app) {
  app.get('/',
    login.redirectIfAuth('/user'),
    function(req, res) {
      res.render('home', {
        env: {
          AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
          AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
          AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
        }
      });
    });
}
