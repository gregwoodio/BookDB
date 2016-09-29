// index.js

var express = require('express');
var port = 3000;
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

//setup routes
require('./routes')(app);

app.listen(port);
console.log('Listening on port ' + port)

module.exports = app;