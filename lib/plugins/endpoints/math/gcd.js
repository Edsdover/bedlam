'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/gcd/{num}/{num2}',
    config: {
      description: 'Finds GCD of two numbers',
      validate: {
        params: {
          num: Joi.number().required(),
          num2: Joi.number().required()
        }
      },
      handler: function(request, reply){
        var maxNum = Math.abs(Math.max(request.params.num, request.params.num2));
        var minNum = Math.abs(Math.min(request.params.num, request.params.num2));
        if(minNum === 0){
          return reply({value: 'No GCD Possible'});
        }
        var i = minNum;
        while(i){
          if(maxNum % i === 0 && minNum % i === 0){
            break;
          }
          i -= 1;
        }
        return reply({value: i});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'math.gcd'
};
