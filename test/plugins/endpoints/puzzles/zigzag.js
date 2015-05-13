/* eslint no-unused-expressions: 0 */
'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../lib/server');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;
var before = lab.before;
var after = lab.after;

var server;

describe('GET/puzzles/zigzag', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });
  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });
  it('should zigzag sort an ordered list of numbers', function(done){
    server.inject({method: 'GET', url: '/puzzles/zigzag/3,4,5,6,8,9', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.deep.equal([9, 3, 8, 4, 6, 5]);
      done();
    });
  });
  it('should zigzag sort an unordered list of numbers', function(done){
    server.inject({method: 'GET', url: '/puzzles/zigzag/67,4,5,1,88,44', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.deep.equal([88, 1, 67, 4, 44, 5]);
      done();
    });
  });
  it('should fail if no numbers provided', function(done){
    server.inject({method: 'GET', url: '/puzzles/zigzag/', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
  it('should zigzag sort an odd list of numbers', function(done){
    server.inject({method: 'GET', url: '/puzzles/zigzag/221,3,66,721,11', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.deep.equal([721, 3, 221, 11, 66]);
      done();
    });
  });
});
