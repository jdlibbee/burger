var bodyParse = require("body-parser");
var express = require("express");
var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(bodyParse.urlencoded({ extended: true }));

app.use(bodyParse.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller");

app.use(routes);

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});