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

	socket.on('message', function(msg) {
		io.emit('message', msg);
	})
});

http.listen(3000, function() {
	console.log("Chat successfully listen on localhost:3000");
});