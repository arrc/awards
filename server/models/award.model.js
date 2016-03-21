'use strict';
let mongoose = require('mongoose');

let AwardSchema =  mongoose.Schema({
  name: String,
  year: Number,
  category: String,
  nominees: [{name: String, count: Number}],
  winner: String
});

AwardSchema.options.toJSON = {
  virtuals : true
};

module.exports = mongoose.model('Award', AwardSchema);
