const Http = require('http');
var __objErrFunctions = {};

exports.badRequest = (message, data) => {
    message = message.replace(RegExp('"', 'g'),'');
    return __objErrFunctions.create(400, message, data, exports.badRequest);
};

__objErrFunctions.create = function (statusCode, message, data, ctor) {
    var error = new Error(message ? message : undefined);       
    Error.captureStackTrace(error, ctor);                       
    error.data = data || null;
    __objErrFunctions.initialize(error, statusCode);
    return error;
};

__objErrFunctions.initialize = function (error, statusCode, message) {

    var numberCode = parseInt(statusCode, 10);
    error.isValidationError = true;
    error.isServer = numberCode >= 500;

    if (!error.hasOwnProperty('data')) {
        error.data = null;
    }

    error.output = {
        statusCode: numberCode,
        payload: {},
        headers: {}
    };

    error.reformat = __objErrFunctions.reformat;
    error.reformat();

    if (!message &&
        !error.message) {

        message = error.output.payload.error;
    }

    if (message) {
        error.message = (message + (error.message ? ': ' + error.message : ''));
    }

    return error;
};


__objErrFunctions.reformat = function () {

    this.output.payload.statusCode = this.output.statusCode;
    this.output.payload.error = Http.STATUS_CODES[this.output.statusCode] || 'Unknown';

    if (this.output.statusCode === 500) {
        this.output.payload.message = 'An internal server error occurred';              
    }
    else if (this.message) {
        this.output.payload.message = this.message;
    }
};


