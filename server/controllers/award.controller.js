'use strict';

let clientScripts = require('../config/scripts.js');
let Award = require('../models/award.model.js');
let User = require('../models/user.model.js');
let _ = require('lodash');
let chance = require('chance').Chance();
let async = require('async');


// disticts award ceremony name
exports.ceremonieName = function(req, res){
  Award.distinct("name", function(err, docs){
    if (err) return console.log("Error", err);
    console.log(docs);
    res.status(200).json({data: docs, message: 'Found results.'});
  });
};

// year
exports.distinctYearForAwardName = function(req, res){
  Award.find({name: "grammy"}).distinct('year', function(err, docs){
    if (err) return console.log("Error", err);
    console.log(docs);
    res.status(200).json({data: docs, message: 'Found results.'});
  });
};

// category and nominees
exports.nominations = function(req, res){
  var q = req.query;

  Award.find({ year: q.year}).exec(function(err, docs){
    if(err) res.json({error: err});
    res.json({data: docs});
  });
};

// award names and year list
exports.ceremonies = function(req, res){
  let results = [];
  async.waterfall([
    function(callback){
      Award.distinct("name", function(err, awardNames){
        if (err) callback(err);
        callback(null, awardNames);
      });
    },
    function(awardNames, callback) {
      async.each(awardNames, function(awardName, callback){
        Award.find({name: awardName}).distinct('year', function(err, awardYears){
          if (err) callback(err);
          let data = {awardName: awardName, awardYears: _.sortBy(awardYears)};
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

exports.vote = function(req, res){
  let nominationsId = req.query.nominations_id;
  let nomineeId = req.query.nominee_id;

  let nominationsDoc, userDoc;
  async.series({
    nominees: function(callback) {
      Award.findById(nominationsId).exec(function(err, nominationsDoc){
        if (err) callback(err);
        nominationsDoc = nominationsDoc;
        callback(null);
      });
    },
    user: function(callback){
      User.findById(req.user._id).exec(function(err, userDoc){
        if (err) callback(err);
        userDoc = userDoc;
        callback(null);
      });
    },
    check: function(callback){
      if(_.includes(userDoc.votes, nomineeId)) {
        // 
      } else {

      }
    }
  }, function(err, results){
    if(!err) return res.status(200).json({data: results, message: 'Found results.'});
    if(err) return res.status(400).json({error: err, message: 'Error occurred.'});
  });
};
