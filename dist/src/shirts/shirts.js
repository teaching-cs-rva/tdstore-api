"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = list;
var fs = require('fs');

function list(res) {
    res.send(fs.readFileSync("./sample_data.json"));
}