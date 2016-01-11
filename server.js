var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.send('<html><head><title>PI!</title></head><body style="background-color: black; color: white;">Hello, PI!</body></html>');
});

app.listen(3000);
