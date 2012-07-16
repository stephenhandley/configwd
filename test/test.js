var assert = require('assert');
var path = require('path');

var config = require('../');

try {
  assert.equal(config.log.level, "debug");
  assert.equal(config.server.barf, undefined);
  
  var expected_public = path.normalize(path.join(__dirname, 'public'));
  assert.equal(config.server.public, expected_public);
  
  console.log("Tests Passed.")
  
} catch (error) {
  console.log(error);
  console.log("Test Failed.");
  console.log("   Expected: " + error.expected);
  console.log("     Actual: " + error.actual); 
}