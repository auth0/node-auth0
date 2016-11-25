var express       = require('express');
var falcorExpress = require('falcor-express');
var Router        = require('falcor-router');
var jwt           = require('express-jwt');
var dotenv        = require('dotenv');
var bodyParser    = require('body-parser');

var app = express();

dotenv.load();

app.use(express.static('.'));

var authenticate = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID
});

var data = [
  {
    "name": "AngularJS",
    "language": "JavaScript"
  },
  {
    "name": "NodeJS",
    "language": "JavaScript"
  },
  {
    "name": "Laravel",
    "language": "PHP"
  }
];

app.use('/api/model.json', authenticate, falcorExpress.dataSourceRoute(function(req, res) {
  return new Router([
    {
      route: "frameworks[{integers:frameworkIds}]['name', 'language']",
      get: function(pathSet) {
        var results = [];

        pathSet.frameworkIds.forEach(function(frameworkId) {

          // An array of key names that map is held at pathSet[2]
          pathSet[2].map(function(key) {

            // Find the framework that corresponds to the current frameworkId
            var frameworkRecord = data[frameworkId];

            // Finally we push a path/value object onto
            // the results array
            results.push({
              path: ['frameworks', frameworkId, key], 
              value: frameworkRecord[key]
            });
          });          
        });

        return results;
      }
    }
  ]);
}));

app.listen(3001);
console.log("Listening on http://localhost:3001");
