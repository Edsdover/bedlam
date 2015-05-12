'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/square/{num}',
    config: {
      description: 'Squares a number',
      validate: {
        params: {
          num: Joi.number().required()
        }
      },
      handler: function(request, reply){
        return reply({value: Math.pow(request.params.num, 2)});
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'math.square'
};
