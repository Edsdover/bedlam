'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/currency/{numString}',
    config: {
      description: 'format number string as currency',
      validate: {
        params: {
          numString: Joi.string()
        }
      },
      handler: function(request, reply){
        if(request.params.numString.search(/[a-zA-Z]/) !== -1){
          return reply().code(400);
        }
        var nums = request.params.numString.split('').reverse();
        var groups = [];
        while(nums.length){
          groups.push(nums.splice(0, 3).reverse().join(''));
        }
        var currency = '$' + groups.reverse().join(',');
        if(currency.split('').indexOf('.') !== -1){
          return reply({value: currency});
        }
        return reply({value: currency + '.00'});
      }
    }
});

  return next();
};

exports.register.attributes = {
  name: 'puzzles.currency'
};
