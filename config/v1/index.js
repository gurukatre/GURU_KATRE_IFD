let allConfigs = {};
let normalizedPath = require("path").join(__dirname);
require("fs").readdirSync(normalizedPath).forEach(function(file) {
	let verb = file.substring(0, file.lastIndexOf('.'));
	if(verb != 'index')
	allConfigs[verb] = verb;
});
module.exports = allConfigs;