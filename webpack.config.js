const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './index.js'
  },
  output: {
    publicPath: '/',
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './tpl/index.html',
      inject: 'body'
    })
  ]
};