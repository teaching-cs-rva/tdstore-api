'use strict';

var express = require('express');
var shirts = require('./src/shirts/shirts');
var app = express();
var port = 3000;

app.get('/', function (req, res) {
    return res.send('Hello World!');
});

function handleShirtCreate(req, res) {
    res.send("THIS IS A POST REQUEST");
}

app.post('/shirt', function (req, res) {
    console.log("Post request made");
    console.log(req.body);
    res.send(req.body);
});
// app.post('/shirt', function (req, res) {
//     res.send("THIS IS A POST");
// });
// app.post('/shirt', handleShirtCreate);


app.get('/shirts', function (req, res) {
    return shirts.list(res);
});

app.listen(port, function () {
    return console.log('Example app listening on port ' + port + '!');
});