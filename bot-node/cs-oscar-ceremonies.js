// Chrome script, run this in chrome's source editor snippets tab.


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
        data.push(t);
    });
});
console.log(JSON.stringify(data));
