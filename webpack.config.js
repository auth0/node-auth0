var Webpack = require('webpack');
var pkg     = require('./package.json');

var StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: './build',
    filename: pkg.name+'-'+pkg.version+'.min.js',
    library: 'Auth0',
    libraryTarget: 'umd',
  },
  node: {
    Buffer: true,
    process: true,
    url: true
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.js$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              // Remove User-agent for browser version
              pattern: /'User-agent': 'node\.js/gmi,
              replacement: function (match, p1, offset, string) {
                return "// 'User-agent': 'node.js";
              }.bind(this)
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new StringReplacePlugin(),
    new Webpack.optimize.DedupePlugin(),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    root: __dirname,
    alias: {},
  }
};
