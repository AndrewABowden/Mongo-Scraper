var express = require("express");
var exphandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var mongojs = require("mongojs");
var bodyparser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();


// // Database configuration
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// https://www.philosophybasics.com/branch_metaphysics.html

    
// // If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// // Set mongoose to leverage built in JavaScript ES6 Promises
// // Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'})
);

app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    res.render('home');
});



// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
    // Make a request for the news section of `ycombinator`
    request("https://news.ycombinator.com/", function(error, response, html) {
      // Load the html body from request into cheerio
      var $ = cheerio.load(html);
      // For each element with a "title" class
      $(".title").each(function(i, element) {
        // Save the text and href of each link enclosed in the current element
        var title = $(element).children("a").text();
        var link = $(element).children("a").attr("href");
  
        // If this found element had both a title and a link
        if (title && link) {
          // Insert the data in the scrapedData db
          db.scrapedData.insert({
            title: title,
            link: link
          },
          function(err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            }
            else {
              // Otherwise, log the inserted data
              console.log(inserted);
            }
          });
        }
      });
    });
  
    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
  });


// Listen on port 3000
app.listen(PORT, function() {
    console.log(`App listening on localhost ${PORT}`);
});
  
