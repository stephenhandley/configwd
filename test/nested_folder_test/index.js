var assert = require('assert');
var path = require('path');

var configwd = path.join('..', '..');
var config = require(configwd);

module.exports = function () {
  assert.equal(config.barf.again, "yes");  
  assert.equal(config.app_root, __dirname);
};