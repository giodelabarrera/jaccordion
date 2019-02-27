const prettierOptions = require('./.prettierrc.js')

const RULES = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2
}

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['standard', 'prettier', 'prettier/standard'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'no-console': RULES.WARNING,
    'no-debugger': RULES.ERROR,
    'no-nested-ternary': RULES.WARNING,
    'no-unused-expressions': RULES.OFF,
    'prettier/prettier': [RULES.ERROR, prettierOptions]
  }
}
