'use strict';
let mongoose = require('mongoose');

let TestSchema =  mongoose.Schema({
  name: String,
  year: Number,
  category: String,
  nominees: { type: Array, default: []},
  winner: String
});

TestSchema.options.toJSON = {
  virtuals : true
};

module.exports = mongoose.model('Test', TestSchema);
