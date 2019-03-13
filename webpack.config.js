/* eslint-disable */
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "awesome-typescript-loader",
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },
  output: {
    //filename: '[name].bundle.js',
    filename: 'pixiGame.js',
    path: path.resolve(__dirname, 'dist')
  }
};
