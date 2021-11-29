const Webpack = require('webpack');
const pkg = require('./package.json');

const StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './build',
    filename: `${pkg.name}-${pkg.version}.min.js`,
    library: 'Auth0',
    libraryTarget: 'umd',
  },
  node: {
    Buffer: true,
    process: true,
    url: true,
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.js$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              // Remove User-Agent for browser version
              pattern: /'User-Agent': 'node\.js/gim,
              replacement: () => "// 'User-Agent': 'node.js",
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new StringReplacePlugin(),
    new Webpack.optimize.DedupePlugin(),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    root: __dirname,
    alias: {},
  },
};
