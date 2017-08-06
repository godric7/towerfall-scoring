const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const babelConfig = {
  presets: ["react", "es2015"]
};

const config = {
  entry: "./src/main.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: babelConfig
      },
      {
        test: /\.css?$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.(ttf|jpg|png)$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/statics/index.html",
      inject: true
    })
  ]
};

module.exports = config;
