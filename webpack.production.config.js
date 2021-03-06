const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SOURCE_PATH = path.resolve(__dirname, 'app');
const ASSETS_PATH = path.join(SOURCE_PATH, 'assets');
const DEST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  entry: [
    path.join(SOURCE_PATH, 'index.js')
  ],

  devtool: 'eval-source-map',

  output: {
    filename: 'bundle.js',
    path: DEST_PATH
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Blendle Calendar',
      template: 'index.ejs'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader', 'eslint-loader'],
        include: SOURCE_PATH
      },

      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: SOURCE_PATH
      },

      {
        test: /\.(gif|jpg|png)$/,
        loader: 'url-loader?limit=25000',
        include: ASSETS_PATH
      },

      // Fonts
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        include: ASSETS_PATH
      },

      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
        include: ASSETS_PATH
      },

      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        include: ASSETS_PATH
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        include: ASSETS_PATH
      }
    ]
  }
};
