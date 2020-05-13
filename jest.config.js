const path = require('path')

module.exports = {
  testRegex: ['/__tests__/.*\\.[jt]sx?$'],
  preset: 'ts-jest',
  globals: { 'ts-jest': { isolatedModules: true } },
  setupFiles: [path.join(__dirname, 'scripts', 'jest-setup.js')],
  transform: { 'node_modules.+(ts-results|async-call-rpc|holoflows).+.js$': 'jest-esm-transformer' },
}
