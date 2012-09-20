var assert = require('assert');
var path = require('path');

var configwd = path.join('..', '..');
var config = require(configwd);

module.exports = function () {
  assert.equal(config.blah.something, "else");
  assert.equal(config.blah.foo, undefined);
  assert.equal(config.database, undefined);

  var expected_public = path.normalize(path.join(__dirname, 'public'));
  assert.equal(config.server.public, expected_public);

  assert.equal(config.app_root, __dirname);
};