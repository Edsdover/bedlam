'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/leapYear/{year}',
    config: {
      description: 'Finds if leap year',
      validate: {
        params: {
          year: Joi.number().required().min(1)
        }
      },
      handler: function(request, reply){
        var year = request.params.year;
        if(year % 4 === 0){
          if(year % 100){
            return reply({value: true});
          }else if(year % 400 === 0 && year % 100 === 0){
            return reply({value: true});
          }
        }
        return reply({value: false});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'math.leapYear'
};
