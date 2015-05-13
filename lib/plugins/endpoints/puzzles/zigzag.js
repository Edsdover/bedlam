'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/zigzag/{nums}',
    config: {
      description: 'returns zigzag sorted list from a list of numbers',
      validate: {
        params: {
          nums: Joi.string()
        }
      },
      handler: function(request, reply){
        var zigzagNums = [];
        var nums = request.params.nums.split(',').map(function(num){
          return num * 1;
        });
        nums = nums.sort(function(cur, old){
          return cur > old;
        });
        while(nums.length > 0){
          zigzagNums.push(nums.pop());
          if(!nums.length){break; }
          zigzagNums.push(nums.shift());
        }
        return reply({value: zigzagNums});
      }
    }
});

  return next();
};

exports.register.attributes = {
  name: 'puzzles.zigzag'
};
