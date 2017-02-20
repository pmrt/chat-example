const express = require('express'),
	  app = express(),
	  path = require('path'),
	  http = require('http').Server(app),
	  io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', function(socket) {
	console.log('User connected');

	socket.on('disconnect', function(socket) {
		console.log('User disconnected');
	});

	socket.on('message', function( data ) {
		socket.broadcast.emit('message', data);
	})
});

http.listen(process.env.PORT || 3000, function() {
	console.log("Chat successfully listen on 3000");
});

