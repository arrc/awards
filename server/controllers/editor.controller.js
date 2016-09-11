'use strict';

let clientScripts = require('../config/scripts.js');
let Award = require('../models/award.model.js');
let Grammy = require('../models/grammy.model.js');
let _ = require('lodash');
let chance = require('chance').Chance();
let async = require('async');

exports.editor = function(req, res){
  let finalDataArray = [];
  let rawText = req.body.text;
  let rawTextArray = rawText.split("\n");

  let finalArray = [];
  let tempArray = [];
  rawTextArray.forEach(function(i){
    if(i !== "===") {
      tempArray.push(i);
    } else {
      finalArray.push(tempArray);
      tempArray = [];
    }
  });

  finalArray.forEach(function(nominee){
    let categoryObject = {
      name: req.body.name,
      year: req.body.year,
    };

    categoryObject.category = nominee[0];
    nominee.splice(0,1);

    categoryObject.winner = nominee[0];

    categoryObject.nominees = nominee.map(function(i){
      var t = {};
      t.name = i;
      t.count = 0;
      return t;
    });

    finalDataArray.push(categoryObject);
  });

  process.nextTick(function(){
    Award.create(finalDataArray, function(err, docs){
      if (err) return res.status(400).json({ error: err, message: "Not saved in db." });
      res.status(200).json({data: docs, message: "Saved in db."});
    });
  });
};
