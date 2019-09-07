const express = require('express')
const shirts = require ('./src/shirts/shirts')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/shirts', (req, res) => shirts.list(res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))