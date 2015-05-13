'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/topN/{nums}/{num}',
    config: {
      description: 'returns top 3 numbers from an ordered list',
      validate: {
        params: {
          num: Joi.number(),
          nums: Joi.string()
        }
      },
      handler: function(request, reply){
        var itsAllGood = true;
        var nums = request.params.nums.split(',').map(function(num){
          if(isNaN(num * 1)){itsAllGood = false; }
          return parseFloat(num);
        });
        nums = nums.sort(function(numA, numB){return numA > numB; });
        var topNums = [];
        for(var i = request.params.num; i > 0; i--){topNums.unshift(nums.pop()); }
        if(itsAllGood){return reply({value: topNums}); }
        return reply().code(400);
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'math.topN'
};
