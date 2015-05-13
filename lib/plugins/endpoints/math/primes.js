'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/primes/{num}',
    config: {
      description: 'Determines if number is prime',
      validate: {
        params: {
          num: Joi.number().required()
        }
      },
      handler: function(request, reply){
        var num = request.params.num;
        if(num % 2 === 0 || num % 3 === 0){return reply({value: false}); }
        var sqrt = Math.ceil(Math.sqrt(num));
        while(sqrt >= 2){
          if(num % sqrt === 0){
            return reply({value: false});
          }
          sqrt -= 1;
        }
        return reply({value: true});
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'math.primes'
};
