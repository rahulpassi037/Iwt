const express = require('express')
const bodyparser = require('body-parser')
const filesystem = require('fs')
const path = require('path')
const app = express()
const port = 3000
var filename

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/', function (req, res) {
    filename = req.body.name
    console.log(req.body.name)
    var filepath = path.join(__dirname, filename)
    var stat = filesystem.statSync(filepath)
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': stat.size
    })
    var readStream = filesystem.createReadStream(filepath);
    readStream.pipe(res);
})

app.get('/', function (req, res) {
    var filepath = path.join(__dirname, filename)
    var stat = filesystem.statSync(filepath)
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': stat.size
    })
    var readStream = filesystem.createReadStream(filepath);
    readStream.pipe(res);
})

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))