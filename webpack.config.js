  const path = require("path");
  const webpack = require("webpack");
  const bundlePath = path.resolve(__dirname, "dist/");
  
  module.exports = {
    entry: "./src/index.js",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: { presets: ['env'] }
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
        {
         test: /\.(png|svg|jpg|gif)$/,
         use: [ 'file-loader' ]
        }
      ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
      publicPath: bundlePath,
      filename: "bundle.js"
    },
    devServer: {
      contentBase: path.join(__dirname,'public'),
      port: 8080,
      publicPath: "http://localhost:8080/dist"
    },
    plugins: [ new webpack.HotModuleReplacementPlugin() ]
  };