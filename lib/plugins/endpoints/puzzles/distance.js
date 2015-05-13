'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/distance/{points}',
    config: {
      description: 'find distance traveled between points',
      validate: {
        params: {
          points: Joi.string()
        }
      },
      handler: function(request, reply){
        var total = 0;
        var points = request.params.points.split('-').join('').match(/[0-9]\,[0-9]/g).map(function(numPair){
          numPair = numPair.split(',');
          return [numPair[0] * 1, numPair[1] * 1];
        });
        points.forEach(function(pair, index){
          if(points[index + 1]){
            var side1 = Math.pow(points[index + 1][0] - pair[0], 2);
            var side2 = Math.pow(points[index + 1][1] - pair[1], 2);
            total += Math.sqrt(side1 + side2);
          }
        });
        return reply({value: parseFloat(total.toFixed(2))});
      }
    }
});
  return next();
};

exports.register.attributes = {
  name: 'puzzles.distance'
};
