var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src/js');

var config = {
  entry: ['babel-polyfill', APP_DIR + '/main.js'],
  output: {
    path: BUILD_DIR,
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '~': '.',
    },
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?' + JSON.stringify({
          cacheDirectory: true,
          presets: [
            'es2015', 'react', 'stage-0',
          ],
          plugins: [
            'transform-decorators-legacy',
            'babel-plugin-webpack-alias',
            // 'lodash',
            // 'react-hot-loader/babel'
          ],
        }),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // A common mistake is not stringifying the "production" string.
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};

module.exports = config;
