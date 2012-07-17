var assert = require('assert');
var path = require('path');

var configwd = path.join('..', '..');
var config = require(configwd);

try {
  assert.equal(config.log.level, "debug");
  assert.equal(config.server.barf, undefined);
  
  var expected_public = path.normalize(path.join(__dirname, 'public'));
  assert.equal(config.server.public, expected_public);
  
  assert.equal(config.app_root, __dirname);
  
  console.log("Single file tests passed.")
  
} catch (error) {
  console.log(error);
  console.log("Test Failed.");
  console.log("   Expected: " + error.expected);
  console.log("     Actual: " + error.actual); 
}