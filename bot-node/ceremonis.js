'use strict';
let _ = require('lodash');
let request = require('request');
let cheerio = require('cheerio');
var cheerioAdv = require('cheerio-advanced-selectors');
let fs = require('fs');
var fsp = require('fs-promise');
cheerio = cheerioAdv.wrap(cheerio);

var cheerioize = function(localData){
  var $ = cheerio.load(localData);
  var myMainTable = $('table.wikitable tbody').eq(1);
  var data = [];
  myMainTable.each(function() {
    var children = $(this).children();
    children.each(function() {
      var t = {};
      var link = "https://en.wikipedia.org" + $(this).children().first().find('a').attr("href");
      var yearRaw = $(this).children().eq(1).text();
      t.link = link;
      t.year = $(yearRaw.split(' ')).last()[0];
    //         console.log(t);
      data.push(t);
    });
  });
  console.log(data);

};

fsp.readFile('award-ceremonies.html', 'utf8').then(function(data){
  cheerioize(data);
});
