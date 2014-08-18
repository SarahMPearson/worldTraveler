/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Vacation    = require('../../app/models/vacation'),
    dbConnect = require('../../app/lib/mongodb'),
    Mongo     = require('mongodb'),
    cp        = require('child_process'),
    db        = 'vacations';

describe('Vacation', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Vacation object', function(){
      var o = {name: 'Hong Kong',start:'8/19/2014', end:'8/30/2014', lat:'70', lng:'150', photos:[]},
          v = new Vacation(o);
      expect(v).to.be.instanceof(Vacation);
      expect(v.name).to.equal('Hong Kong');
      expect(v.start).to.be.instanceof(Date);
      expect(v.end).to.be.instanceof(Date);
      expect(v.lat).to.equal(70);
      expect(v.lng).to.equal(150);
      expect(v.photos).to.have.length(0);
    });
  });

  describe('.all', function(){
    it('should get all Vacations', function(done){
      Vacation.all(function(err, vacation){
        expect(vacation).to.have.length(2);
        done();
      });
    });
  });

  describe('.create', function(){
    it('should create a new vacation in the database', function(done){
      var o = {name: 'Hong Kong',start:'8/19/2014', end:'8/30/2014', lat:'70', lng:'150', photos:[]};
      Vacation.create(o, function(err, vacation){
        expect(vacation._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
}); //last bracket


