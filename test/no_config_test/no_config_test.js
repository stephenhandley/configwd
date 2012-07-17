var assert = require('assert');
var path = require('path');

try {
  
  var configwd = path.join('..', '..');
  assert.throws(function() { require(configwd); }, /no config/);
  
  console.log("No config test passed.")
  
} catch (error) {
  console.log(error);
  console.log("Test Failed.");
  console.log("   Expected: " + error.expected);
  console.log("     Actual: " + error.actual); 
}