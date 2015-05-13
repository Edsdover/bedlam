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

describe('GET/math/gcd/25/15', function(){
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
  it('should return 5 as gcd', function(done){
    server.inject({method: 'GET', url: '/math/gcd/25/15', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(5);
      done();
    });
  });
  it('should return gcd even if negitive passed', function(done){
    server.inject({method: 'GET', url: '/math/gcd/-25/15', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(5);
      done();
    });
  });
  it('should return 1 if no greater GCD is found', function(done){
    server.inject({method: 'GET', url: '/math/gcd/4/9', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(1);
      done();
    });
  });
  it('should return 1 with a prime number in the pair', function(done){
    server.inject({method: 'GET', url: '/math/gcd/4/7', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(1);
      done();
    });
  });
  it('should return error if no comparison entered', function(done){
    server.inject({method: 'GET', url: '/math/gcd/15', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
  it('should return string if no gcd possible', function(done){
    server.inject({method: 'GET', url: '/math/gcd/0/9', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('No GCD Possible');
      done();
    });
  });
  it('should return string if no gcd possible', function(done){
    server.inject({method: 'GET', url: '/math/gcd/1/0', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('No GCD Possible');
      done();
    });
  });
  it('should return string if no gcd possible', function(done){
    server.inject({method: 'GET', url: '/math/gcd/0/0', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('No GCD Possible');
      done();
    });
  });
});
