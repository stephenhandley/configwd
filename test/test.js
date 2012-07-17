var path = require('path');

function deleteConfigwdRequire() {
  // delete the require from the previous test
  var configwd_path = path.normalize(path.join(__dirname, '..', 'index.js'));
  delete require.cache[configwd_path];
}

['single_file_test', 'folder_test', 'no_config_test'].forEach(function (test) {
  deleteConfigwdRequire();
  process.chdir(path.join(__dirname, test));
  require(test);
});