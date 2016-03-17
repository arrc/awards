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
    console.log(i, ceremony);
    request(ceremony, function(error, response, body){

      let $ = cheerio.load(body);
      let ceremonyYear = $('.firstHeading').text();

      let logMe = function(category, winner, nominees){
        let data = {
          year: ceremonyYear,
          category: category,
          winner: winner,
          nominees: nominees
        };
        createRecord(data, function(docs){
          console.log(docs);
        });
        // console.log(data);
        console.log('\n');
      };

      let mainTable = $('table.wikitable');
      mainTable.each(function(i, el){
        if(i === 0 ){

          let tableRows = $(this).find('tr td');
          tableRows.each(function(i, el){

            let category = $(this).find('div b a').text();

            console.log(category);

            if(category === "Best Picture"){
              let winner = $(this).find('ul li b i').text();
              let nominees = $(this).find('ul li ul li > i');
              let nomineesArray = [];
              nominees.each(function(){
                nomineesArray.push($(this).text());
              });
              logMe(category, winner, nomineesArray);
            }

            if(_.includes(["Best Director", "Best Actor", "Best Actress",
            "Best Supporting Actor", "Best Supporting Actress", "Best Original Screenplay", "Best Adapted Screenplay"], category)) {
              let winner = $(this).find('ul li b a').text();
              let nominees = $(this).find('ul li ul li');
              let nomineesArray = [];
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
