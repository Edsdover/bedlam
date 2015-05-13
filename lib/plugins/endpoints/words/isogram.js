'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/words/isogram/{word}',
    config: {
      description: 'returns true if word is isogram',
      validate: {
        params: {
          word: Joi.string()
        }
      },
      handler: function(request, reply){
        var word = request.params.word.toLowerCase().split('');
        for(var i = 0; i < word.length; i++){
          for(var i2 = 0; i < word.length; i++){
            if(word[i] === word[i2] && i !== i2){
              return reply({value: false});
            }
          }
        }
        return reply({value: true});
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'words.isogram'
};
