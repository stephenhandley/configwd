var assert = require('assert');
var path = require('path');

var _reset = require('../reset');

module.exports = function () {
  _reset(__dirname);
  var configwd = path.join(__dirname, '..', '..');
  var config = require(configwd);

  assert.equal(config.barf.again, "yes");
  assert.equal(config.app_root, __dirname);
};