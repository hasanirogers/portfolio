'use strict';

const { resolve, join } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const ENV = process.argv.find(arg => arg.includes('production')) ? 'production' : 'development';

const themeDirectory = resolve('wp-content/themes/anubis');
const webComponentsJS = './node_modules/@webcomponents/webcomponentsjs';

const copyFiles = [
  {
    from: resolve(`${webComponentsJS}/webcomponents-*.{js,map}`),
    to: join(themeDirectory, 'vendor'),
    flatten: true
  },
  {
    from: resolve(`${webComponentsJS}/custom-elements-es5-adapter.js`),
    to: join(themeDirectory, 'vendor'),
    flatten: true
  }
];

const babel = [{
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
}];

const styleLintConfig = {
  context: './src',
  failOnError: true
}

const miniCSSExtractConfig = {
  filename: "bundle.css"
}

const miniCSSExtractLoaders = [
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
];

const commonConfig = merge([
  {
    entry: [
      'regenerator-runtime/runtime',
      themeDirectory + '/src/packages/me-app/me-app.js',
      themeDirectory + '/src/styles/app.scss'
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
          use: babel
        },

        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: miniCSSExtractLoaders
        }
      ]
    }
  }
]);

const developmentConfig = merge([
  {
    devtool: 'cheap-module-source-map',
    plugins: [
      new CopyWebpackPlugin(copyFiles),
      new StyleLintPlugin(styleLintConfig),
      new MiniCssExtractPlugin(miniCSSExtractConfig),
      new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1})
    ]
  }
]);

module.exports = mode => {
  return merge(commonConfig, developmentConfig, { mode });
};
