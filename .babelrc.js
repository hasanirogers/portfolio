module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        //modules: false,
        //exclude: ['transform-async-to-generator', 'transform-regenerator'],
        // targets: {
        //   "browsers": ["last 2 versions", "ie >= 11"]
        // }
      }
    ]
  ],
  plugins: [
    '@babel/syntax-dynamic-import', // this is needed to support dynamic imports
    '@babel/syntax-object-rest-spread' // this is needed to support the spred operator
  ],
  env: {
    production: {
      plugins: [
        [
          'template-html-minifier',
          {
            modules: {
              '@polymer/polymer/lib/utils/html-tag.js': ['html']
            },
            htmlMinifier: {
              collapseWhitespace: true,
              minifyCSS: true,
              removeComments: true
            }
          }
        ]
      ]
    }
  }
};
