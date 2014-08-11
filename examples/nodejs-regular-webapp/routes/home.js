module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('home', {
      user: req.user,
      env:  {
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
        CALLBACK_URL: process.env.CALLBACK_URL,
      }
    });
  });
}
