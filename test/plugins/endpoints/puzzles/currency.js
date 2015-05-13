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

describe('GET/puzzles/currency', function(){
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
  it('should change a sting of numbers to currency', function(done){
    server.inject({method: 'GET', url: '/puzzles/currency/12312312', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('$12,312,312.00');
      done();
    });
  });
  it('should throw an error if letter is in string', function(done){
    server.inject({method: 'GET', url: '/puzzles/currency/123d123', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should return 0 if 0', function(done){
    server.inject({method: 'GET', url: '/puzzles/currency/0', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('$0.00');
      done();
    });
  });
  it('should return decimal if decimal input', function(done){
    server.inject({method: 'GET', url: '/puzzles/currency/.09', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('$.09');
      done();
    });
  });
});
