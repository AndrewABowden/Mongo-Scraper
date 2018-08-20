var express = require("express");
var exphandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var mongojs = require("mongojs");
var bodyparser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request");

// Initialize Express
var app = express();


// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

https://www.philosophybasics.com/branch_metaphysics.html


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});
  
