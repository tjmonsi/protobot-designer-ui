module.exports = {
  'extends': 'semistandard',
  'parser': 'babel-eslint',
  'plugins': [
    'standard',
    'promise',
    'mocha',
    'html',
    'chai-expect'
  ],
  'env': {
    'browser': true,
    'node': true,
    'mocha': true
  },
  'rules': {
    'no-unused-expressions': 0
  },
  'globals': {
    'expect': true
  }
};
