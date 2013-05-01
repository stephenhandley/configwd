var assert = require('assert');
var path = require('path');

var _reset = require('../reset');

module.exports = function () {
  _reset(__dirname);
  var configwd = path.join(__dirname, '..', '..');

  assert.throws(function() {
    require(configwd);
  }, /no config/);
};