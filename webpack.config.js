const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.ts"
  },
  plugins: [new CleanWebpackPlugin(["dist"])],
  devServer: {
    historyApiFallback: true
  },
  output: {
    filename: "index_bundle.js",
    path: path.resolve("dist")
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ }
    ]
  }
};
