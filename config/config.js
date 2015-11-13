var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'microjourn-al'
    },
    port: 3000,
    db: 'mongodb://localhost/microjourn-al-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'microjourn-al'
    },
    port: 3000,
    db: 'mongodb://localhost/microjourn-al-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'microjourn-al'
    },
    port: 3000,
    db: 'mongodb://localhost/microjourn-al-production'
  }
};

module.exports = config[env];
