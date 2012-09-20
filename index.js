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

var config_json;
var config_json_filepath = path.join(app_root, 'config.json');

if (fs.existsSync(config_json_filepath)) {
  config_json = _readJsonConfigFile(config_json_filepath);
  
} else {    
  var folder_filepath = path.join(app_root, 'config');
  
  if (!(fs.existsSync(folder_filepath) && fs.statSync(folder_filepath).isDirectory())) {
    throw "no config.json or config folder found in " + app_root;
  }
  
  config_json = _readConfigFolder(folder_filepath);
}

config_json.app_root = app_root;

// Read and parse a json file
function _readJsonConfigFile(config_json_filepath) {
  try {
    var config_json_string = fs.readFileSync(config_json_filepath, 'utf8');
    config_json_string = config_json_string.replace(/{{APP_ROOT}}/g, app_root);    
    return JSON.parse(config_json_string);
    
  } catch (error) {
    console.log("There was an error reading this config file: " + config_json_filepath);
    throw error;
  }
}

function _readConfigFolder(folder_filepath) {
  var all_config_json = {};
  
  fs.readdirSync(folder_filepath).forEach(function (filename) {  
    var filepath = path.join(folder_filepath, filename);
    var basename, config_json;
    
    if (fs.statSync(filepath).isDirectory()) {
       basename = filename;
       config_json = _readConfigFolder(filepath);
       
    } else {    
      // don't require non-javascript files like blah.conf
      if (path.extname(filename) !== '.json') { return }
      basename = path.basename(filename, '.json');
      config_json = _readJsonConfigFile(filepath);
    }
    
    all_config_json[basename] = config_json;
  });
  
  return all_config_json;
}

module.exports = config_json;