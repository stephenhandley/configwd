var path = require('path');
var fs = require('fs');

function deleteConfigwdRequire() {
  var configwd_path = path.normalize(path.join(__dirname, '..', 'index.js'));
  delete require.cache[configwd_path];
}

try {
  fs.readdirSync(__dirname).forEach(function (filename) {     
    var filepath = path.join(__dirname, filename);
    
    if (fs.statSync(filepath).isDirectory()) {
      // delete the require from the previous test 
      deleteConfigwdRequire(); 
      
      // change to the test dir so the configwd require will work
      process.chdir(filepath);
      
      // run the test
      var test = require(filepath);
      test();
      console.log(filename + " tests passed");
    }
  });
  
} catch (error) {
  console.log(error);
  console.log("Test Failed.");
  console.log("   Expected: " + error.expected);
  console.log("     Actual: " + error.actual); 
}