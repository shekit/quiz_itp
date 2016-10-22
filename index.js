var express = require('express')

var app = express()

var http = require('http')
http = http.Server(app)

app.get('/', function(req, res){

	res.send("Hello ITP")
})

app.get('/about', function(req, res){

	res.send("ABOUT ITP")
})

app.get('/contact', function(req, res){

	res.send("contact page")
})

var server = http.listen(3000, function(){

	console.log("I am listening on port 3000")
})