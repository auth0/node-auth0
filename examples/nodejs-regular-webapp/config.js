var swig =          require('swig'),
    passport =      require('passport'),
    logger =        require('morgan'),
    cors =          require('cors'),
    express =       require('express'),
    Auth0Strategy = require('passport-auth0');
    cookieParser =  require('cookie-parser'),
    session =       require('express-session'),
    bodyParser =    require('body-parser');

exports.template = function(app) {
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
}

exports.parsers = function(app) {
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());
  app.use(cookieParser());
}

exports.log = function(app) {
  if (process.env.NODE_ENV === 'development') {
    app.use(express.logger('dev'));
  }
}

exports.session = function(app) {
  app.use(session({ secret: 'my super secret' }));
}

exports.static = function(app) {
  app.use('/public', express.static(__dirname + '/public'));
}

exports.passport = function(app) {
  var strategy = new Auth0Strategy({
    domain:       process.env['AUTH0_DOMAIN'],
    clientID:     process.env['AUTH0_CLIENT_ID'],
    clientSecret: process.env['AUTH0_CLIENT_SECRET'],
    callbackURL:  process.env['AUTH0_CALLBACK_URL'] || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, profile, done) {
    //Some tracing info
    console.log('profile is', profile);
    //save the profile
    return done(null, profile);
  });

  passport.use(strategy);

  // you can use this section to keep a smaller payload
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  app.use(passport.initialize());
  app.use(passport.session());

}
