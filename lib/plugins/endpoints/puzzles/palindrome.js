'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/palindrome/{str}',
    config: {
      description: 'returns true or false for a string being a palindrome',
      validate: {
        params: {
          str: Joi.string()
        }
      },
      handler: function(request, reply){
        var palindrome = request.params.str.toLowerCase().replace(/[^a-z]/g, '');
        var revr = palindrome.split('').reverse().join('');
        if(revr === palindrome){
          return reply({value: true});
        }
        return reply({value: false});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.palindrome'
};
