//Require dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

//Require our route file pass our router object
require("./config/routes")(router);

//Designate our public folder as a static directory 
app.use(express.static(__dirname + "/public"));

//Connect handlebars
app.engine("handlebars", expressHandlebars ({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//BodyParser 
app.use(bodyParser.urlencoded({
    extended: false
}));

//Have every request go through our router middleware
app.use(router);

//Connect mongoose to our database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";
mongoose.set("useCreateIndex", true)

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}, function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Mongoose connection is successful");
    }
});

app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
});