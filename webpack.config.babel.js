import path from 'path';

export default {
  entry: '.',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: path.resolve(__dirname, 'node_modules'),
    }, {
      test: /\.html$/,
      loader: 'ractive',
      exclude: path.resolve(__dirname, 'node_modules'),
    }, {
      test: /\.less$/,
      loader: 'style!css!autoprefixer!less',
      exclude: path.resolve(__dirname, 'node_modules'),
    }, {
      test: /\.(gif|jpe?g|png|svg)$/,
      loader: 'file',
    }],
  },
};
