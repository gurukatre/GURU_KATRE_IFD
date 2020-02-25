let allControllers = {};
let normalizedPath = require("path").join(__dirname);
require("fs").readdirSync(normalizedPath).forEach(function(file) {
	let verb = file.substring(0, file.lastIndexOf('.'));
	if(verb != 'index'){
		let __controller = require("./" + file);
		if(typeof __controller == 'function'){
			 __controller = new __controller();
		}
		allControllers[verb] = __controller;
	}
	
});
module.exports = allControllers;