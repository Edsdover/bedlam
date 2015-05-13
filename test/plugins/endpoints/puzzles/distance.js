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

describe('GET/puzzles/distance', function(){
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
  it('return distance between all points', function(done){
    server.inject({method: 'GET', url: '/puzzles/distance/(1,1)(2,4)(4,5)', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(5.40);
      done();
    });
  });
  it('return distance between all points', function(done){
    server.inject({method: 'GET', url: '/puzzles/distance/(9,9)(3,9)', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(6);
      done();
    });
  });
  it('return distance between all points', function(done){
    server.inject({method: 'GET', url: '/puzzles/distance/(-9,-9)(-3,-9)', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(6);
      done();
    });
  });
  it('return distance between all points', function(done){
    server.inject({method: 'GET', url: '/puzzles/distance/(1,1)(2,4)(4,5)(8,9)', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(11.06);
      done();
    });
  });
  it('explodes if gets no of the things. none', function(done){
    server.inject({method: 'GET', url: '/puzzles/distance/', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
