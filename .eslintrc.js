module.exports = {
  env: {
    es2021: true,
    node: true,
    commonjs: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'coma-dangle': 'off'
  }
}
