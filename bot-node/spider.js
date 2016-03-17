'use strict';
let _ = require('lodash');
let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
var fsp = require('fs-promise');

var cheerioize = function(localData){
  var $ = cheerio.load(localData);
  // let mainTableRows = $('table.wikitable').eq(0);
  // console.log($('table.wikitable').eq(0).html());

  var logMe = function(category, winner, nominees){
    let data = {
      category: category,
      winner: winner,
      nominees: nominees
    };
    console.log(data);
    console.log('\n');
  };

  var mainTable = $('table.wikitable');
  mainTable.each(function(i, el){
    if(i === 0 ){

      let tableRows = $(this).find('tr td');
      tableRows.each(function(i, el){

        let category = $(this).find('div b a').text();

        if(_.includes(["Best Picture", "Best Visual Effects", "Best Art Direction", "Best Animated Feature"], category)){
          let nomineesArray = [];
          let winner = $(this).find('ul li b i').text();
          nomineesArray.push(winner);
          let nominees = $(this).find('ul li ul li > i');
          nominees.each(function(){
            nomineesArray.push($(this).text());
          });
          logMe(category, winner, nomineesArray);
        }

        if(_.includes(["Best Adapted Screenplay"], category)){
          let nomineesArray = [];
          let winner = $(this).find('ul li b').text();
          nomineesArray.push(winner);
          let nominees = $(this).find('ul li ul li');
          nominees.each(function(){
            nomineesArray.push($(this).text());
          });
          logMe(category, winner, nomineesArray);
        }

        if(_.includes(["Best Director", "Best Actor", "Best Actress",
        "Best Supporting Actor", "Best Supporting Actress", "Best Original Screenplay", "Best Original Score"], category)) {
          let nomineesArray = [];
          let winner = $(this).find('ul li b').text();
          nomineesArray.push(winner);
          let nominees = $(this).find('ul li ul li');
          nominees.each(function(){
            nomineesArray.push($(this).text());
          });
          logMe(category, winner, nomineesArray);
        }
      });
    }
  });
};


fsp.readFile('88th academy.html', 'utf8').then(function(data){
  cheerioize(data);
});

// Loading from the web
// request('https://en.wikipedia.org/wiki/88th_Academy_Awards', function(error, response, body) {
//   cheerioize(body);
// });
