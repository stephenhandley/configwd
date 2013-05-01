var fs = require('fs');
var path = require('path');

var env_app_root = process.env['APP_ROOT'];
var app_root;

if (env_app_root != null) {
  if (env_app_root[0] === '/') {
    app_root = env_app_root;
  } else {
    app_root = path.normalize(path.join(process.cwd(), env_app_root));
  }

} else {
  app_root = process.cwd();
}

var config;
var config_filepath = path.join(app_root, 'config.json');

if (fs.existsSync(config_filepath)) {
  config = _readJsonConfigFile(config_filepath);

} else {
  var directory_filepath = path.join(app_root, 'config');

  if (!(fs.existsSync(directory_filepath) && fs.statSync(directory_filepath).isDirectory())) {
    throw "no config.json or config folder found in " + app_root;
  }

  config = _readConfigDirectory(directory_filepath);

  // if the config folder itself has a config.json with an environment
  // merge that environment's config data in config/config.json and ignore the rest
  var namespaced = config.config;
  if (namespaced && namespaced.environment && config[namespaced.environment]) {
    var environment_config = config[namespaced.environment];
    for (var attr in environment_config) {
      namespaced[attr] = environment_config[attr];
    }
    config = namespaced;
  }
}

config.app_root = app_root;

// Read and parse a json file
function _readJsonConfigFile(filepath) {
  try {
    var json_string = fs.readFileSync(filepath, 'utf8');
    json_string = json_string.replace(/{{APP_ROOT}}/g, app_root);
    return JSON.parse(json_string);

  } catch (error) {
    console.log("There was an error reading this config file: " + filepath);
    throw error;
  }
}

function _readConfigDirectory(directory_filepath) {
  var dir_config = {};

  fs.readdirSync(directory_filepath).forEach(function (filename) {
    var filepath = path.join(directory_filepath, filename);
    var basename, sub_config;

    if (fs.statSync(filepath).isDirectory()) {
       basename = filename;
       sub_config = _readConfigDirectory(filepath);

    } else {
      // don't require non-javascript files like blah.conf
      if (path.extname(filename) !== '.json') { return }
      basename = path.basename(filename, '.json');
      sub_config = _readJsonConfigFile(filepath);
    }

    dir_config[basename] = sub_config;
  });

  return dir_config;
}

module.exports = config;