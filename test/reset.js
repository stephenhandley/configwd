var Path = require('path');

module.exports = function (filepath) {
  var configwd_path = Path.normalize(Path.join(__dirname, '..', 'index.js'));
  delete require.cache[configwd_path];
  process.chdir(filepath);
}
