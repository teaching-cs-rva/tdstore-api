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

app.route('/deal')
    .post((req, res, next) => {
        let deal = req.body;

        if(deal.status === undefined)
            deal.status = "Pending";

        // here we want to validate the deals to ensure new deals meet certain standards.
        let validationMessages = [];
        if (deal.id !== undefined)
            validationMessages.push("New deals cannot specify their own id.");

        if(deal.criteria === undefined || deal.criteria.length == 0)
            validationMessages.push("Deals must specify criteria.");

        if(deal.deal === undefined)
            validationMessages.push("Deals must have a deal specified.");

        if(validationMessages.length > 0) {
            res.statusCode = 400;
            res.send(validationMessages);
        } else {
            // This is not a good way to handle ids, we'll talk about why next time we meet up.
            deal.id = deals[deals.length - 1].id + 1;
            deals.push(deal);

            res.send(deal);
        }
    });

app.route('/deal/:dealid')
    .get((req, res, next) => {
        // Parse the dealid from the url
        let dealid = req.params.dealid;

        // Fetch the deal from the loaded array of deals
        let deal = deals.filter(d => {
            return d.id == dealid;
        });

        // If we don't have a deal, return no content
        if (deal === undefined || deal == null || deal.length == 0)
            res.sendStatus(204);
        
        // Send the resulting deal
        res.send(deal[0]);
    });

app.route('/deal/:dealid/status')
    .get((req, res, next) => {
        // Parse the dealid from the url
        let dealid = req.params.dealid;

        // Fetch the deal from the loaded array of deals
        let deal = deals.filter(d => {
            return d.id == dealid;
        });

        // If no deals match, return no content
        if (deal.length == 0) {
            res.statusCode = 204;
        } else {
            res.send({status : deal[0].status});
        }
    })
    .put((req, res, next) => {
        // We want to restrict stati to a small set, to avoid having to deal with free input
        const allowedStati = ["Active", "Pending", "Disabled"];

        // Parsing the id, and grabbing the body from the request
        let dealid = req.params.dealid;
        let change = req.body;

        // If the status is not set, or is not allowed, we return a validation message
        if (change.status === undefined || !allowedStati.includes(change.status) ) {
            res.statusCode = 400;
            res.send("Allowable stati are: {Active, Pending, Disabled}");
        }

        // Get the deal that matches our id
        let deal = deals.filter(d => {
            return d.id == dealid;
        });

        // If no deal is found, return no content.
        if(deal.length == 0) {
            res.statusCode = 204;
        } else {
            // Set the status to the new status, reply with the object
            deal[0].status = change.status;
            res.send(deal[0]);
        }
    });


app.route('/shirts')
    .get((req, res, next) => (res.send(shirts)));

app.route('/shirt')
    .get((req, res, next) => {res.send("Hello world")})
    .post((req, res, next) => (res.send(req.body)));

