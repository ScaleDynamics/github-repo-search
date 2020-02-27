const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const WarpifyPlugin = require('@warpjs/webpack-plugin');

require('dotenv').config();

module.exports = {
  output: {
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: ['vue-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CopyPlugin([{ from: 'public', to: '.' }]),
    new VueLoaderPlugin(),
    // WarpJS webpack plugin
    new WarpifyPlugin({
      exclude: [/node_modules/],
      include: [/\.js$/],
      config: {
        project: {
          userId: process.env.WARPJS_USER_ID,
          name: process.env.WARPJS_PROJECT_NAME
        }
      }
    })
  ]
};
