var assert = require('assert');
var path = require('path');

module.exports = function () {
  var configwd = path.join('..', '..');
  
  assert.throws(function() { require(configwd); }, /no config/);  
};