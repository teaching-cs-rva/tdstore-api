const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express()
const port = 3000

// Load data on startup
const shirts = JSON.parse(fs.readFileSync('./data/sample-shirts.json'));
const deals = JSON.parse(fs.readFileSync('./data/sample-deals.json'));

app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listenting on port ${port}`));

app.route('/deals')
    .get((req, res, next) => (res.send(deals)));

app.route('/deal/:dealid')
    .get((req, res, next) => {
        // Parse the dealid from the url
        let dealid = req.params.dealid;

        // Fetch the deal from the loaded array of deals
        let deal = deals.filter(d => {
            return d.id == dealid;
        });

        // If we don't have a deal, return a 404
        if (deal === undefined || deal == null || deal.length == 0)
            res.sendStatus("404");
        
        // Send the resulting deal
        res.send(deal[0]);
    });

app.route('/shirts')
    .get((req, res, next) => (res.send(shirts)));

app.route('/shirt')
    .get((req, res, next) => {res.send("Hello world")})
    .post((req, res, next) => (res.send(req.body)));

