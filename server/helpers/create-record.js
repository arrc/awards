'use strict';

let clientScripts = require('../config/scripts.js');
let Award = require('../models/award.model.js');
let _ = require('lodash');
let chance = require('chance').Chance();
let async = require('async');

exports.createRecord = function(data, callback){
  Award.create(data, function(err, docs){
    if (err) return console.log("Error", err);
    callback(docs);
  });
};
