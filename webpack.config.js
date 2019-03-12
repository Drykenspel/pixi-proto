/* eslint-disable */
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  plugins: [],
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
