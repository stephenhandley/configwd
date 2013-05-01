var assert = require('assert');
var path = require('path');

var _reset = require('../reset');

module.exports = function () {
  _reset(__dirname);
  var configwd = path.join(__dirname, '..', '..');
  var config = require(configwd);

  assert.equal(config.log.level, "debug");
  assert.equal(config.server.barf, undefined);

  var expected_public = path.normalize(path.join(__dirname, 'public'));
  assert.equal(config.server.public, expected_public);

  assert.equal(config.app_root, __dirname);
};