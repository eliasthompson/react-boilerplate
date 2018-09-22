const webpack = require('webpack');
const path = require('path');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./config.json');

require('dotenv').config();

const plugins = [
  new HtmlWebpackPlugin({
    hash: true,
    title: config.name,
    lang: config.defaultLang,
    template: './index.template.html',
    noscript: 'You need to enable JavaScript to use this application.',
  }),
  // new FaviconsWebpackPlugin({
  //   logo: './public/images/logo.png',
  //   prefix: 'images/icons/[hash]/',
  //   background: config.themeColor,
  //   title: config.shortName,
  // }),
  new WebpackPwaManifest({
    name: config.name,
    short_name: config.shortName,
    icons: [
      {
        src: './public/images/logo.png',
        sizes: [16, 32],
        type: 'image/x-icon'
      }
    ],
    start_url: '/?utm_source=pwa',
    scope: '/',
    display: 'standalone',
    background_color: config.themeColor,
    theme_color: config.themeColor,
    ios: {
      'apple-mobile-web-app-title': config.shortName,
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
    },
  }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CopyWebpackPlugin([
      { from: 'public', to: 'public' },
    ]),
  );
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: './src/index.js',
  },
  output: {
    path: `${__dirname}/build`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
        ],
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.(ttf|eot|woff|woff2|png|jpeg|jpg|gif|ico)$/,
        exclude: [
          /node_modules/,
        ],
        use: {
          loader: 'file-loader',
          options: { name: './[name].[ext]' },
        },
      },
    ],
  },
  plugins,
  serve: {
    hot: true,
    port: process.env.PORT || 8080,
    add: (app) => {
      app.use(convert(history()));
    },
  },
};
