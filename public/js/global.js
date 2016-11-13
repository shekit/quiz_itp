$(document).ready(function(){

	var socket = io()

	socket.emit("message","this is a socket message")

	socket.on("resend", function(content){

		//alert(content)
		console.log(content)
	})

	$("#socket").on('click', function(){

		socket.emit("click", "hello");
	})


	$("#chat").on('submit', function(event){

		event.preventDefault()

		var message = $("#chat-message").val()

		socket.emit("chat", message)

	})

	socket.on("outgoing-message", function(data){

		var list = $("<li>"+data+"</li>")

		$("#chat-messages").append(list)

	})

	$("#user").on('submit', function(event){

		event.preventDefault();

		var inputValue = $("#username").val()


		$.ajax({
			url: '/newuser',
			method: 'post',
			data: {name:inputValue}
		})
		.done(function(response){
			alert(response)
		})
		.fail(function(error){
			console.log(error)
		})

	})


	$("#gif").on('submit', function(event){

		event.preventDefault();

		var query = $("#gif-value").val();

		$.ajax({
			url: '/search/'+query,
			method: 'get'
		})
		.done(function(response){

			var img = $("<li><img src='"+response+"'/></li>")

			$("#chat-messages").append(img)
		})
	})



























})












