const mongoose = require('mongoose');
var fs        = require('fs');
var envConfig = require('../../config/env');
var config    = envConfig.get('mongo');
var path      = require('path');

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
	autoReconnect: true,
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms  
	poolSize: 15, // Maintain up to 15 socket connections
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 30000 // Close sockets after 30 seconds of inactivity
};

var mongo        = {};

let mongo_url = config.url;
mongoose.connect(mongo_url, options);

mongoose.Promise = global.Promise;
let mongoConnection = mongoose.connection;
mongo.connection = mongoConnection;

mongoConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));


fs
  .readdirSync(path.resolve(__dirname, './schema/'))
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    let verb = file.substring(0, file.lastIndexOf('.'));
    let mod = require(path.resolve(__dirname, './schema/' + file));
    mongo[mod.modelName] = mod;
  });

module.exports = mongo