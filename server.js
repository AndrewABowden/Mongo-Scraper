var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var mongojs = require("mongojs");
var bodyparser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");
var PORT = process.env.PORT || 3000;
var scrapeURL = "https://old.reddit.come/r/webdev/";
// var scrapeURL = "https://www.philosophybasics.com/branch_metaphysics.html";

// Initialize Express
var app = express();
app.use(express.static("public"));
// https://www.philosophybasics.com/branch_metaphysics.html


// // If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: "main"})
);

app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    request(scrapeURL, function(err, status, html) {
        var $ = cheerio.load(html);
        $("p.title").each(function(err, element){
            var data = {};
            var text = $(element).find("a").text(); //search for a elemment
            data.text = text;
            console.log(text);
            scrapeData.push(data); //pushes out scraped into
        });
    });
    res.render("index"); //knows that its a handlebar thru rendering engine
});

app.get("/link", function (req, res) {
    request(scrapeURL, function(err, element){
        var $ = cheerio.load(html);
        $("link.title").each(function(err, element){
            var data= {};
            var text = $(element).find("a").text();
            data.text = text;
            console.log(text);
            scrapeData.push(data);
        });
    });
});

//summary/url/feel free -- can skip summary.

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
    // Make a request for the news section of `ycombinator`
    request(scrapeURL, function(error, response, html) {
        req.html
      // Load the html body from request into cheerio
      var $ = cheerio.load(html);
      // For each element with a "title" class
      $("p.title").each(function(err, element) {
          var data = {};
          data.text = $(element).find("a").text();//varies per source
          data.link = $(element).find("a").attr("href");
        // Save the text and href of each link enclosed in the current element
        // var title = $(element).children("a").text();
        // var link = $(element).children("a").attr("href");
        scrapeData.push(data);
      }); res.send()
       
       
    //     // If this found element had both a title and a link
    //     if (title && link) {
    //       // Insert the data in the scrapedData db
    //       db.scrapedData.insert({
    //         title: title,
    //         link: link
    //       },
    //       function(err, inserted) {
    //         if (err) {
    //           // Log the error if one is encountered during the query
    //           console.log(err);
    //         }
    //         else {
    //           // Otherwise, log the inserted data
    //           console.log(inserted);
    //         }
    //       });
    //     }
    //   });
    // });
  
    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
  });


// Listen on port 3000
app.listen(PORT, function() {
    console.log(`App listening on localhost ${PORT}`);
});
  
