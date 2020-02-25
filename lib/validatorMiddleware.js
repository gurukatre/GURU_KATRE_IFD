const Joi = require('joi');
const CustomError = require('./customError');
const Extend = require('extend');
const jwtConfig = require('../config/env').get('jwt')
const jwt = require('jsonwebtoken');

exports.validate =  function(schema, options) {
  let __schema = schema.schema;
  // console.log("\n\n\n __schema", schema.public, "\n\n\n")
  if(__schema && !schema.public) __schema.headers = {
    user_id : Joi.string().required()
  }

  options = options || {};

  return function validateRequest(req, res, next) {
    
    
    var toValidate = {};
    /* ignore if */
    if (!__schema) {
      return next();
    }

    ['params', 'body', 'query'].
    forEach(function (key) {
      if (__schema[key]) {
        toValidate[key] = req[key];
      }
    });
    
    if(!schema.public){
      if(!req.headers.authorization){
        return next(CustomError.badRequest("Authentication required!"));
      }
      jwt.verify(req.headers.authorization, jwtConfig.secret, function(err, decoded) {
        if(err) { 
          console.log("\n\nerr",err); 
          return next(CustomError.badRequest("Authentication expired!"));
        }
        req.headers.user_id = decoded.id;
        return Joi.validate(toValidate, __schema, options, onValidationComplete);       
      })
    }else{
        return Joi.validate(toValidate, __schema, options, onValidationComplete);
    }

    function onValidationComplete(err, validated) {
      if (err) {
        return next(CustomError.badRequest(err.message, err.details));
      }
      Extend(req, validated);

      return next();
    }
  }
};