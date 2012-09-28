# Description

Synchronously reads config.json or config/*/*.json from process.cwd() or APP_ROOT environment variable, replacing occurrences of {{APP_ROOT}} in the JSON accordingly.

# Latest Version

1.1.1

# Installation
```
npm install configwd
```

or in package.json 

```json
{
  ...
  "dependencies": {
    "configwd": "~1.1.1"
  }
}
```

# Usage

```
var config = require('configwd');
```

For a folder setup like this:
```
APP_ROOT
  config
    config.json
    development
      barf.json
    production
      hurl.json
```

If config.json looks like:
```
{
  "environment": "development",
  "something": "else"
}
```

the resulting config will be:
```
{
  "environment": "development",
  "something": "else",
  "app_root": "/path/to/app",
  "barf" {
    /* whatever is in config/development/barf.json */
  }
}
```

This way of handling environments/namespaces is more restrictive than I'd like. Trying to think of a better way, but needed this for now. 

#Build status
[![build status](https://secure.travis-ci.org/stephenhandley/configwd.png)](http://travis-ci.org/stephenhandley/configwd)