var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src/js');

var config = {
  entry: APP_DIR + '/main.js',
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
  loaders: [
    {
      test: /\.jsx?$/,
      loader: 'babel-loader?' + JSON.stringify({
                        cacheDirectory: true,
                        presets: ['es2015', 'react', 'stage-0'],
                        plugins: [
                            // 'transform-decorators-legacy',
                            // 'lodash',
                            // 'react-hot-loader/babel'
                        ]
                    }),
      exclude: /node_modules/
    }
  ]
}
};

module.exports = config;
