var express = require('express')
var path = require('path')

var app = express()

var http = require('http')
http = http.Server(app)

// MIDDLEWARE
app.set('views', path.join(__dirname, 'views'))
app.set('view engine','pug')

app.use(express.static(path.join(__dirname, 'public')))


app.get('/', function(req, res){

	var name = "Abhishek"

	// get name from database

	// add first name and last name

	// set it to a variable

	// pass that vairable to the template

	res.render("index.pug", {myname:name})
})

app.get('/about', function(req, res){

	var list = ["chris","leslie","paula","jenny","ondina","patrick"]
	var meeting = false;

	res.render("about.pug", {namelist: list, is_meeting_on: meeting})
})

app.get('/contact', function(req, res){

	res.send("contact page")
})

var server = http.listen(3000, function(){

	console.log("I am listening on port 3000")
})