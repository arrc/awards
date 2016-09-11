// 58th Annual Grammy Awards.html
'use strict';
let _ = require('lodash');
let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
var fsp = require('fs-promise');

var cheerioize = function(localData){
  var $ = cheerio.load(localData);

  var logMe = function(category, winner, nominees){
    let data = {
      category: category,
      winner: winner,
      nominees: nominees
    };
    console.log(data);
    console.log('\n');
  };
  
};


fsp.readFile('58th Annual Grammy Awards.html', 'utf8').then(function(data){
  cheerioize(data);
});
