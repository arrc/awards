// Chrome script, run this in chrome's source editor snippets tab.


"use strict";
var myMainTable = $('table.wikitable tbody').eq(1);
var links = [];
myMainTable.each(function() {
    var children = $(this).children();
    children.each(function() {
        var link = "https://en.wikipedia.org" + $(this).children().first().find('a').attr("href");
        links.push(link);
    });
});
console.log(links);
