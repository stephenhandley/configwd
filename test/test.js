var Path = require('path');
var Asserts = require('asserts');

Asserts.dir({
  before_each: function (filepath) {
    var configwd_path = Path.normalize(Path.join(__dirname, '..', 'index.js'));
    delete require.cache[configwd_path];
    process.chdir(filepath);
  }
});
