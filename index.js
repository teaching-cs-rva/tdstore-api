const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express()
const port = 3000

app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listenting on port ${port}`));

app.route('/deals')
    .get((req, res, next) => (res.send(fs.readFileSync('./data/sample-deals.json'))));

app.route('/shirts')
    .get((req, res, next) => (res.send(fs.readFileSync('./data/sample-shirts.json'))));

app.route('/shirt')
    .get((req, res, next) => {res.send("Hello world")})
    .post((req, res, next) => (res.send(req.body)));

app.route('deal')
    .get((req, res, next) => (res.send("This is a deal")));