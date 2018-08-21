var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    text: String,
    link: String
});

var ArticleModel = mongoose.model("Article", ArticleSchema);
//export this

module.exports = ArticleModel; 
//boiler plate for all models.
//now we must export the 

//export from index js into models into sever.
//index.js and article.js frm last assignment