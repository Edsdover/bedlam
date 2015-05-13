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

describe('GET/words/vowels', function(){
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
  it('returns vowel count', function(done){
    server.inject({method: 'GET', url: '/words/vowels/dog', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(1);
      done();
    });
  });
  it('returns tougher vowel count', function(done){
    server.inject({method: 'GET', url: '/words/vowels/doooog_monkey_poop_up', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(9);
      done();
    });
  });
  it('returns tougher vowel count', function(done){
    server.inject({method: 'GET', url: '/words/vowels/mnbnmwmnw', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(0);
      done();
    });
  });
});
