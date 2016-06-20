var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './js/components/Index'
  ],
  output: {
    path: path.join(__dirname, '../backend-api/public'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel?presets[]=react,presets[]=es2015'],
      include: path.join(__dirname, 'js')
    }]
  }
};