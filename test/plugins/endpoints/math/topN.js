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

describe('GET/math/topN/3,4,5,6,7/3', function(){
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
  it('should return highest 3 numbers from ordered set', function(done){
    server.inject({method: 'GET', url: '/math/topN/3,4,5,6,7/3', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.deep.equal([5, 6, 7]);
      done();
    });
  });
  it('should return highest 2 numbers from unordered set', function(done){
    server.inject({method: 'GET', url: '/math/topN/23,4,87,46,7/2', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.deep.equal([46, 87]);
      done();
    });
  });
  it('should fail when letters are passed in', function(done){
    server.inject({method: 'GET', url: '/math/topN/23,a,e,23,4/2', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
});
