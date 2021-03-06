const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    port: 8080,
    publicPath: "http://localhost:8080/dist"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});