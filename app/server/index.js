const express = require('express'),
	  app = express(),
	  path = require('path'),
	  http = require('http').Server(app),
	  io = require('socket.io')(http);

var messages = [];
var id = 0;

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', function(socket) {
	console.log('User connected');
	
	socket.on('loaded', function() {
		// When component has loaded
		// send last 40 messages
		socket.emit( 'messages', messages );
	});

	socket.on('disconnect', function(socket) {
		console.log('User disconnected');
	});

	socket.on('message', function( data ) {
		data.id = id++;
		if ( messages.length > 40 ) {
			messages.shift();
		}
		messages.push( data );
		io.emit('message', data);
	})
});

http.listen(process.env.PORT || 3000, function() {
	console.log("Chat successfully listen on 3000");
});

