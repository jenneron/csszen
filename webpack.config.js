const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/',
    port: 9000,
    contentBase: path.join(__dirname, './src'),
    host: '127.0.0.1',
    hot: true,
  },
  entry: './src/index.js',
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, './src')],
        exclude: /node_modules/,
        loader: 'eslint-loader',
        test: /\.js$/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'file-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}