const express = require('express'),
	  app = express(),
	  path = require('path'),
	  http = require('http').Server(app),
	  io = require('socket.io')(http);

var messages = [];
var connected = [];
var id = 0;

function getClientById( id ) {
	return connected[ getIndexById( id )];
}

function getIndexById( id ) {
	return connected.indexOf( connected.find((i) => i.id == id) );
}

function removeUser( id ) {
	connected.splice( getIndexById( id ), 1 );
} 

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', function(socket) {
	console.log('User connected');
	
	socket.on('loaded', function( data ) {
		// When component has loaded
		// send last 40 messages
		socket.emit( 'messages', messages );
		connected.push( data );
		io.emit( 'user:update', connected );
	});

	socket.on('disconnect', function() {
		console.log('User disconnected');
		removeUser( socket.id );
		io.emit( 'user:update', connected );
	});

	socket.on('message', function( data ) {
		data.id = id++;
		if ( messages.length > 40 ) {
			messages.shift();
		}
		messages.push( data );
		io.emit('message', data);
	})

	socket.on('message:private', function( data ) {
		socket.broadcast.to( data.id ).emit( data.msg );
		socket.broadcast.to( socket.id ).emit( data.msg );
	})

	// Client asks for receiver when 
	// private chat is loaded
	socket.on('who:receiver', function(id) {
		socket.emit('receiver', getClientById(id) );
	})

});

http.listen(process.env.PORT || 3000, function() {
	console.log("Chat successfully listen on 3000");
});

