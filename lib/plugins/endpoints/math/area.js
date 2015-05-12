'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/area/{num}/{num2}',
    config: {
      description: 'Finds area of room',
      validate: {
        params: {
          num: Joi.number().min(0).required(),
          num2: Joi.number().min(0).required()
        }
      },
      handler: function(request, reply){
        return reply({value: request.params.num * request.params.num2});
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'math.area'
};
