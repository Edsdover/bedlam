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

describe('GET/math/leapYear/{year}', function(){
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
  it('should return true for a leap year', function(done){
    server.inject({method: 'GET', url: '/math/leapYear/2016', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should return false for a non leap year', function(done){
    server.inject({method: 'GET', url: '/math/leapYear/2017', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should fail if user enters letters', function(done){
    server.inject({method: 'GET', url: '/math/leapYear/a', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should recognize a special case as true', function(done){
    server.inject({method: 'GET', url: '/math/leapYear/2400', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should recognize a special case as false', function(done){
    server.inject({method: 'GET', url: '/math/leapYear/1800', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should recognize a special case as false', function(done){
    server.inject({method: 'GET', url: '/math/leapYear/3', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
});
