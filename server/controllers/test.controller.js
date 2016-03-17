'use strict';

let clientScripts = require('../config/scripts.js');
let Test = require('../models/test.model.js');
let _ = require('lodash');
let chance = require('chance').Chance();
let async = require('async');
let helpers = require('../helpers');

exports.distinctAwardName = function(req, res){
  Test.distinct("name", function(err, docs){
    if (err) return console.log("Error", err);
    console.log(docs);
    res.status(200).json({data: docs, message: 'Found results.'});
  });
};

exports.distinctYearForAwardName = function(req, res){
  Test.find({name: "grammy"}).distinct('year', function(err, docs){
    if (err) return console.log("Error", err);
    console.log(docs);
    res.status(200).json({data: docs, message: 'Found results.'});
  });
};

exports.awardsPolls = function(req, res){
  Test.find({ name: "oscar", year: "2001"}).exec(function(err, docs){
    if(err) res.json({error: err});
    res.json({data: docs});
  });
};

exports.awardNamesAndYears = function(req, res){
  let results = [];
  async.waterfall([
    function(callback){
      Test.distinct("name", function(err, awardNames){
        if (err) callback(err);
        callback(null, awardNames);
      });
    },
    function(awardNames, callback) {
      async.each(awardNames, function(awardName, callback){
        Test.find({name: awardName}).distinct('year', function(err, awardYears){
          if (err) callback(err);
          let data = {awardName: awardName, awardYears: awardYears};
          results.push(data);
          callback();
        });
      }, callback);
    }
  ], function(err){
    if(!err) return res.status(200).json({data: results, message: 'Found results.'});
    if(err) return res.status(400).json({error: err, message: 'Error occurred.'});
  });

};

exports.create = function(req, res){
  helpers.createRecord(req, function(docs){
    res.status(200).json({data: docs, message: 'Record Created successfully.'});
  });
};
