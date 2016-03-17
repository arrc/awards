'use strict';
let _ = require('lodash');
let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
var fsp = require('fs-promise');


// var cheerioize = function(localData){
//   var $ = cheerio.load(localData);
//   var myMainTable = $('table.wikitable tbody').eq(1);
//   var links = [];
//   myMainTable.each(function() {
//     var children = $(this).children();
//     children.each(function() {
//         var link = "https://en.wikipedia.org" + $(this).children().first().find('a').attr("href");
//         links.push(link);
//     });
//   });
//   console.log(links);
//
// };
//
// fsp.readFile('award-ceremonies.html', 'utf8').then(function(data){
//   cheerioize(data);
// });
