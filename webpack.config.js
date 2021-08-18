const { resolve, join } = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


// directories
// -----------

const themeDirectory = resolve('wp-content/themes/anubis');
const wcJSDirectory = './node_modules/@webcomponents/webcomponentsjs';


// configuration options
// ---------------------

const pluginConfigs = {
  copyFiles: {
    patterns: [
      {
        from: resolve(`${wcJSDirectory}/webcomponents-*.{js,map}`), // we need this for browsers that don't support web components
        to: join(themeDirectory, 'vendor')
      },
      {
        from: resolve(`${wcJSDirectory}/custom-elements-es5-adapter.js`), // we need this since we're transpiling to es5
        to: join(themeDirectory, 'vendor')
      }
    ]
  },

  styleLint: {
    context: './src',
    failOnError: true
  },


  miniCSSExtract: {
    filename: "bundle.css" // this is what actually get served after sass is compiled
  },

  browserSync: {
    files: '**/*.php', // we have to tell browserSync to reload when we change php files
    proxy: 'http://hasanirogers.local' // this address your WordPress site runs on locally
  }
}

const loaderConfigs = {
  babel: [{
    loader: 'babel-loader',
    options: {
      plugins: [
        '@babel/syntax-dynamic-import', // this is needed to support dynamic imports
        '@babel/syntax-object-rest-spread' // this is needed to support the spread  operator
      ]
    }
  }],

  // order is important here
  // execute bottom first to top
  miniCSSExtract: [
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


// main export
// -----------

module.exports = {
  context: __dirname,

  entry: [
    // 'regenerator-runtime/runtime', // is needed for async/await
    `${themeDirectory}/src/packages/me-app/me-app.js`, // this file bootstraps our LitElement PWA
    `${themeDirectory}/src/styles/app.scss` // use this file for any global styles
  ],

  output: {
    path: join(__dirname, 'wp-content/themes/anubis/bundles'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-html|lit-element|@polymer|@vaadin)\/).*/,
        use: loaderConfigs.babel
      },

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: loaderConfigs.miniCSSExtract
      }
    ]
  },

  devtool: 'cheap-module-source-map',

  plugins: [
    new CopyWebpackPlugin(pluginConfigs.copyFiles),
    new StyleLintPlugin(pluginConfigs.styleLint),
    new MiniCssExtractPlugin(pluginConfigs.miniCSSExtract),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}), // we only want to produce 1 bundle.js file
    new BrowserSyncPlugin(pluginConfigs.browserSync, { reload: false })
  ]
};
