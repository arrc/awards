'use strict';

let clientScripts = require('../config/scripts.js');
let Award = require('../models/award.model.js');
let _ = require('lodash');
let chance = require('chance').Chance();
let async = require('async');
let request = require('request');
let cheerio = require('cheerio');
let ceremonies = require('./oscar-ceremonis.js');
let createRecord = require('./create-record').createRecord;

exports.oscar = function(req, res){
  ceremonies.forEach(function(ceremony,i){
    console.log(i);
    if(i > 70) { // 50 since 52nd - 1980
      request(ceremony.link, function(error, response, body){
        if (!error && response.statusCode === 200) {
          let $ = cheerio.load(body);
          // let name = $('.firstHeading').text();
          // console.log(name);
          let logMe = function(category, winner, nominees){
            let data = {
              name: "Oscar",
              year: ceremony.year,
              category: category,
              winner: winner,
              nominees: nominees
            };
            createRecord(data, function(docs){
              console.log(docs);
            });
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
                  nomineesArray.push({name: winner, count: 0});
                  let nominees = $(this).find('ul li ul li > i');
                  nominees.each(function(){
                    nomineesArray.push({name: $(this).text(), count: 0});
                  });
                  logMe(category, winner, nomineesArray);
                }

                if(_.includes(["Best Director", "Best Actor", "Best Actress",
                "Best Supporting Actor", "Best Supporting Actress", "Best Original Screenplay", "Best Original Score", "Best Adapted Screenplay"], category)) {
                  let nomineesArray = [];
                  let winner = $(this).find('ul li b').text();
                  nomineesArray.push({name: winner, count: 0});
                  let nominees = $(this).find('ul li ul li');
                  nominees.each(function(){
                    nomineesArray.push({name: $(this).text(), count: 0});
                  });
                  logMe(category, winner, nomineesArray);
                }
              });
            }
          });
        } else {
          console.error(error, ceremony.year, ceremony.link);
        }
      });
    }
  });
};
