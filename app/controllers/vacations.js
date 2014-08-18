'use strict';

var Vacation = require('../models/vacation'),
    moment   = require('moment'),
    mp       = require('multiparty');

exports.init = function(req, res){
  res.render('vacations/init');
};

exports.create = function(req, res){
  Vacation.create(req.body, function(){
    res.redirect('/vacations');
  });
};

exports.index = function(req, res){
  Vacation.all(function(err, dog){
    res.render('vacations/index', {vacations:dog, moment:moment});
  });
};

exports.show = function(req, res){
  Vacation.findById(req.params.id, function(dog){
    res.render('vacations/show', {vacation:dog, moment:moment});
  });
};

exports.downloadPhoto = function(req, res){
  Vacation.findById(req.params.id, function(vacation){
    vacation.downloadPhoto(req.body.url, function(){
      res.redirect('/vacations/' + req.params.id);
    });
  });
};
exports.uploadPhoto = function(req, res){
  Vacation.findById(req.params.id, function(vacation){
    var form = new mp.Form();
    form.parse(req, function(err, fields, files){
      vacation.uploadPhoto(files, function(){
        res.redirect('/vacations/' + req.params.id);
      });
    });
  });
};
