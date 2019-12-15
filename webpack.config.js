// reference: https://github.com/web-padawan/polymer3-webpack-starter/blob/ff1ea616e2a4f1853e193efea5cc4f1311acd74b/webpack.config.js
'use strict';

const { resolve, join } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ENV = process.argv.find(arg => arg.includes('production')) ? 'production' : 'development';
const OUTPUT_PATH = resolve('wp-content/themes/anubis');

const webcomponentsjs = './node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
  {
    from: resolve(`${webcomponentsjs}/webcomponents-*.{js,map}`),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  },
  {
    from: resolve(`${webcomponentsjs}/custom-elements-es5-adapter.js`),
    to: join(OUTPUT_PATH, 'vendor'),
    flatten: true
  }
];

const stylelint = {
  context: './src',
  failOnError: true
}

const babel = {
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: 'false',
          targets: {
            browsers: '> 1%, IE 11, not dead'
          }
        }
      ]
    ],
    plugins: [
      '@babel/syntax-dynamic-import', // this is needed to support dynamic imports
      '@babel/syntax-object-rest-spread' // this is needed to support the spred operator
    ]
  }
};

const commonConfig = merge([
  {
    entry: [
      '@babel/polyfill', // We need this to resolve regeneratorRuntime is not defined error
      OUTPUT_PATH + '/src/scripts/app.js',
      OUTPUT_PATH + '/src/styles/app.scss'
    ],

    output: {
      path: join(__dirname, 'wp-content/themes/anubis/bundles'),
      filename: 'bundle.js'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          // whitelist packages containing ES modules
          exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-html|lit-element|@polymer|@vaadin)\/).*/,
          use: [babel]
        },

        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {sourceMap: true}
            },
            {
              loader: "postcss-loader",
              options: {sourceMap: true}
            },
            {
              loader: "sass-loader",
              options: {sourceMap: true}
            }
          ]

        }
      ]
    }
  }
]);

const developmentConfig = merge([
  {
    devtool: 'cheap-module-source-map',
    plugins: [
      new CopyWebpackPlugin(polyfills),
      new StyleLintPlugin(stylelint),
      new MiniCssExtractPlugin({filename: "bundle.css"}),
      new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1})
    ]
  }
]);

module.exports = mode => {
  return merge(commonConfig, developmentConfig, { mode });
};
