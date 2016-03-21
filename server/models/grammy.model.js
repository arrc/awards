'use strict';
let mongoose = require('mongoose');

let GrammySchema =  mongoose.Schema({
  name: String,
  year: Number,
  category: String,
  nominees: [{name: String, count: Number}],
  winner: String
});

GrammySchema.options.toJSON = {
  virtuals : true
};

module.exports = mongoose.model('Grammy', GrammySchema);
