var express = require('express')
var path = require('path')

var bodyParser = require('body-parser')

var app = express()

var http = require('http')
http = http.Server(app)


var mongoose = require('mongoose')
// connect to the db
mongoose.connect("mongodb://hello:hello@ds037234.mlab.com:37234/workshop");

var db = mongoose.connection;


db.on('open', function(){

	console.log("I have connected to the database")
})


var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {
		type: String,
		trim: true
	}
})

var User = mongoose.model('User', userSchema)

// MIDDLEWARE

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

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


app.get('/user', function(req, res){

	// save a user to the database

	var newUser = new User({
		name: "paula"
	})

	newUser.save(function(err,result){

		if(err){
			console.log(err)
			res.send("Error saving your name")
		} else {
			res.send("Saved to database!")
		}


	})



})

app.get('/filter', function(req, res){

	User.find({name:"paula"}, function(err, result){

		return res.json(
			{
				data: result
			}
		)
	})

})

app.post('/newuser', function(req, res, next){

	var newname = req.body.username

	var newuser = new User({
		name: newname
	})

	newuser.save(function(err, result){

		if(err){
			res.send("could not save")
		} else {
			res.send("saved to database!")
		}
	})


})


app.get('/all', function(req, res){

	// show me all the currently saved users

	User.find({}, function(err, results){

		if(err){
			res.send("caanot find anyone")
		}

		return res.json(
			{
				data: results
			}
		)
	})
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