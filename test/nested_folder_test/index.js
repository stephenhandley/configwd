var assert = require('assert');
var path = require('path');

var configwd = path.join('..', '..');
var config = require(configwd);

module.exports = function () {
  assert.equal(config.dev.barf.again, "yes");
  assert.equal(config.prod.barf.again, "no");
  
  assert.equal(config.app_root, __dirname);
};