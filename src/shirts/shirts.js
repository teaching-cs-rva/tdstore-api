const fs = require('fs');

export default class Shirts {
    list (res) {
        res.send(fs.readFileSync("./sample_data.json"));
    }
}
