var express =      require('express'),
    http =         require('http'),
    config =       require('./config'),
    walker =       require('node-sync-walker'),
    dotenv =       require('dotenv');


var app = express();

dotenv.load();

app.set('showStackError', true);

// Prettify HTML
app.locals.pretty = true;


// Configure Logging
config.log(app);

// Configure templates
config.template(app);

// Configure parsers
config.parsers(app);

// Configure session
config.session(app);

// Configure passport
config.passport(app);

// Configure static folders
config.static(app);

walker.routeWalker(__dirname + '/routes', app);

var port = process.env.PORT || 3000;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
