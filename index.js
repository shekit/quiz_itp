var express = require('express')
var path = require('path')

var giphy = require('giphy-api')()

var bodyParser = require('body-parser')



var app = express()

var io = require('socket.io')(http)

var http = require('http')
http = http.Server(app)




var mongoos = require('mongoose')
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

//app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// 	extended: true
// }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine','pug')

//app.use(express.static(path.join(__dirname, 'public')))


app.get('/', function(req, res){

	var name = "Abhishek"

	// get name from database

	// add first name and last name

	// set it to a variable

	// pass that vairable to the template

	res.render("index.pug", {myname:name})
}

app.get('/gif', function(req, res){

	var searchQuery = req.query.search
	var myduration = req.query.duration

	giphy.search(searchQuery, function(err, result){

		res.send(result.data[0].url)
	})

})

app.get('/search/:thing', function(req, res){

	var searchQuery = req.params.thing

	giphy.search(searchQuery, function(req, result){
		res.send(result.data[0].images.fixed_height.url)
	})
})

app.get('/give-me-a-gif', function(req, res){

	giphy.search('superman', function(err, result){

		res.send(result.data[0].images.fixed_height.url)
	})
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

	var newname = req.body.names

	var newuser = new User({
		name: newname
	})

	newuser.save(function(err, result){

		if(err){
			res.send("could not save")
		} else {
			res.send("your first ajax save")
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

io.on('connection', function(incoming){

	console.log("new client connected")

	socket.on("chat", function(data){

		io.emit("outgoing-message", data)
	})

	socket.on("click", function(data){
		console.log(data)
	})

	socket.on("message", function(data){

		console.log(data)

		socket.emit("resend", data)
	})

})

var server = http.listen(3000, function(){

	console.log("I am listening on port 3000")
})










