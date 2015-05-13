'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/words/vowels/{str}',
    config: {
      description: 'returns vowel count',
      validate: {
        params: {
          str: Joi.string()
        }
      },
      handler: function(request, reply){
        return reply({value: request.params.str.toLowerCase().match(/[a,e,i,o,u]/g) ? request.params.str.toLowerCase().match(/[a,e,i,o,u]/g).length : 0});
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'words.vowels'
};
