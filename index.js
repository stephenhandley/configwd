var fs = require('fs');
var path = require('path');

try {
  var env_app_root = process.env['APP_ROOT'];
  var app_root;
  if (env_app_root != null) {
    if (env_app_root[0] == '/') {
      app_root = env_app_root;
    } else {
      app_root = path.normalize(path.join(process.cwd(), env_app_root));
    }
    
  } else {
    app_root = process.cwd();
  }
  
  var config_json_filepath = path.join(app_root, 'config.json');
  var config_json_string = fs.readFileSync(config_json_filepath, 'utf8');
  config_json_string = config_json_string.replace(/{{APP_ROOT}}/g, app_root);
    
  var config_json = JSON.parse(config_json_string);
  config_json.app_root = app_root;
  
  module.exports = config_json;
  
} catch (error) {
  console.log("There was an error reading " + config_json_filepath);
  throw error;
}

