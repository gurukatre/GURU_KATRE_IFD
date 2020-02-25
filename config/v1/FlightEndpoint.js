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
    },
    put: {
      method: 'putFlight',
      public: true,
      schema: {
          query: Joi.any(),
          data: Joi.any()
      }
    },
    get: {
      method: 'getFlight',
      public: true,
      schema: {
        flightCode: Joi.string(),
        flightProvider: Joi.string(),
        sourcePortName: Joi.string(),
        sourcePortCode: Joi.string(),
        destinationPortName: Joi.string(),
        destinationPortCode: Joi.string(),
        scheduledArrival: Joi.string(),
        status: Joi.string()
      }
    },
    delete: {
      method: 'deleteFlight',
      public: true,
      schema: {
        flightCode: Joi.string(),
        flightProvider: Joi.string(),
        sourcePortName: Joi.string(),
        sourcePortCode: Joi.string(),
        destinationPortName: Joi.string(),
        destinationPortCode: Joi.string(),
        scheduledArrival: Joi.string(),
        status: Joi.string()
      }
    },
  }
};