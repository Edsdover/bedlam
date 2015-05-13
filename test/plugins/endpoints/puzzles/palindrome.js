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

describe('GET/puzzles/palindrome', function(){
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
  it('should return true for a real palindrome dawg', function(done){
    server.inject({method: 'GET', url: '/puzzles/palindrome/racecar', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should return false for el gato string', function(done){
    server.inject({method: 'GET', url: '/puzzles/palindrome/elgato', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should return true for a big ass palindrome', function(done){
    server.inject({method: 'GET', url: '/puzzles/palindrome/On a clover, if alive, erupts a vast, pure evil; a fire volcano.', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should return error for no palindrome yo', function(done){
    server.inject({method: 'GET', url: '/puzzles/palindrome/', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
