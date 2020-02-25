var nconf = require('nconf');
nconf.argv().env();
var path = require('path');
var environment = nconf.get('NODE_ENV') || 'home';
nconf.file(path.resolve(__dirname, 'default.json'));
nconf.file(path.resolve(__dirname, environment + '_config.json'));

module.exports = nconf;