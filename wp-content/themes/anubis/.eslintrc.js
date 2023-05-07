const path = require('path');

module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    babelOptions: {
      configFile: path.join(__dirname, '.babelrc')
    }
  },
  plugins: ["react"],
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  },
  extends: [
    "@open-wc/eslint-config",
    "eslint-config-prettier"
  ]
}
