'use strict';
module.exports = {
  '/flight': {
    post: {
      method: 'postFlight',
      public: true,
      schema: {
        body: {
          flightCode: Joi.string(),
          flightProvider: Joi.string(),
          sourcePortName: Joi.string(),
          sourcePortCode: Joi.string(),
          destinationPortName: Joi.string(),
          destinationPortCode: Joi.string(),
          scheduledArrival: Joi.string(),
          status: Joi.string()
        }
      }
    }
};