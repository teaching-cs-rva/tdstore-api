'use strict';

var express = require('express');
var shirts = require('./src/shirts/shirts');
var app = express();
var port = 3000;

app.get('/', function (req, res) {
  return res.send('Hello World!');
});
app.get('/shirts', function (req, res) {
  return shirts.list(res);
});

app.listen(port, function () {
  return console.log('Example app listening on port ' + port + '!');
});