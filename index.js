var fs = require('fs');
var path = require('path');

function readJsonConfigFile(config_json_filepath) {
  try {
    var config_json_string = fs.readFileSync(config_json_filepath, 'utf8');
    config_json_string = config_json_string.replace(/{{APP_ROOT}}/g, app_root);    
    return JSON.parse(config_json_string);
    
  } catch (error) {
    console.log("There was an error reading " + config_json_filepath);
    throw error;
  }
}

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

var config_json;

var config_json_filepath = path.join(app_root, 'config.json');
if (fs.existsSync(config_json_filepath)) {
  config_json = readJsonConfigFile(config_json_filepath);
  
} else {    
  var config_folder = path.join(app_root, 'config');
  if (fs.existsSync(config_folder) && fs.statSync(config_folder).isDirectory()) {
    config_json = {};
    fs.readdirSync(config_folder).forEach(function (config_filename) {
      var basename = path.basename(config_filename, '.json');
      config_json[basename] = readJsonConfigFile(path.join(config_folder, config_filename));
    });
    
  } else {
    throw "no config.json or config folder found in " + app_root;
  }
}

config_json.app_root = app_root;
module.exports = config_json;


