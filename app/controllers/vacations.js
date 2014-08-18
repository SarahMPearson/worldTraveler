'use strict';

var Vacation = require('../models/vacation'),
    moment   = require('moment');

exports.init = function(req, res){
  res.render('vacations/init');
};

exports.create = function(req, res){
  var vacation = new Vacation(req.body);
  vacation.create(function(){
    res.redirect('/vacations');
  });
};

exports.index = function(req, res){
  Vacation.all(function(err, dog){
    res.render('vacations/index', {vacations:dog, moment:moment});
  });
};
