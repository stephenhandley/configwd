# Description

Synchronously reads config.json from process.cwd() or APP_ROOT environment variable, replacing occurrences of {{APP_ROOT}} in the JSON accordingly

# Latest Version

0.0.1

# Installation
```
npm install configwd
```

or in package.json 

```json
{
  ...
  "dependencies": {
    "configwd: "~0.0.1"
  }
}
```

# Usage

```
var config = require('configwd');
```