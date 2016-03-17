'use strict';

let clientScripts = require('../config/scripts.js');
let Test = require('../models/test.model.js');
let _ = require('lodash');
let chance = require('chance').Chance();
let async = require('async');
let request = require('request');
let cheerio = require('cheerio');
let ceremonies = require('./oscar-ceremonis.js');
let helpers = require('./index');
let createRecord = require('./create-record').createRecord;


ceremonies.forEach(function(ceremony,i){
  if(i > 74) { // 50 since 52nd - 1980
    request(ceremony.link, function(error, response, body){

      let $ = cheerio.load(body);
      let name = $('.firstHeading').text();

      let logMe = function(category, winner, nominees){
        let data = {
          name: name,
          year: ceremony.year,
          category: category,
          winner: winner,
          nominees: nominees
        };
        createRecord(data, function(docs){
          console.log(docs);
        });
        // console.log(JSON.stringify(data));
        // console.log('\n');
      };

      let mainTable = $('table.wikitable');
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
    });
  }
});
