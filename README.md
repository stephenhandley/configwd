# Description

Synchronously reads config.json or config/*/*.json from process.cwd() or APP_ROOT environment variable, replacing occurrences of {{APP_ROOT}} in the JSON accordingly.

# Latest Version

1.0.0

# Installation
```
npm install configwd
```

or in package.json 

```json
{
  ...
  "dependencies": {
    "configwd": "~1.0.0"
  }
}
```

# Usage

```
var config = require('configwd');
```

#Build status
[![build status](https://secure.travis-ci.org/stephenhandley/configwd.png)](http://travis-ci.org/stephenhandley/configwd)