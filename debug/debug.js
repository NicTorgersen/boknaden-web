var express = require('express')
var path = require('path')
var app = express()

app.use(express.static('../'))

app.all("/*", function(req, res){
    res.sendFile(path.resolve('../index.html'))
})

app.listen('3000', function () {
    console.log('App running on port 3k')
})
