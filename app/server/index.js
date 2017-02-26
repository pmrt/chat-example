const express = require('express'),
	  app = express(),
	  path = require('path'),
	  http = require('http').Server(app),
	  io = require('socket.io')(http);

var messages = [];
var private_messages = {};
var connected = [];
var id = 0;
var priv_id = 0;

function getClientById( id ) {
	return connected[ getIndexById( id )];
}

function getIndexById( id ) {
	return connected.indexOf( connected.find((i) => i.id == id) );
}

function removeUser( id ) {
	connected.splice( getIndexById( id ), 1 );
}

function getRoomMessagesById( roomid ) {
	return private_messages[roomid];
}

function getNameById( socketid ) {
	var obj = connected.find( (i) => i.id == socketid )
	if ( obj ) return obj.name; 
}

function isArrayEmpty( arr ) {
	if ( arr === undefined ) return true;
	if ( arr === null ) return true;
	if (!arr.length > 0 ) return false;
}


app.use(express.static(path.join(__dirname, '../public/dist')));

io.on('connection', function(socket) {
	console.log('User connected');
	
	socket.on('loaded', function( data, updateUser=true ) {
		// When component has loaded
		// send last 40 messages
		socket.emit( 'messages', messages );
		connected.push( data );
		console.log(connected);
		if ( updateUser ) {
			io.emit( 'user:update', connected );
			io.emit( 'user:connected', connected );
		}
	});

	socket.on('disconnect', function() {
		console.log('User disconnected');
		io.emit( 'user:disconnect', getNameById( socket.id ) );
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
		var msg = data.message,
			roomID = data.room,
			historial = getRoomMessagesById( roomID );
		data.message.id = priv_id++;
		if ( !isArrayEmpty(historial) ) {
			if ( historial.length > 40 ) {
				historial.shift();
			}
		}
		private_messages[roomID].push( data.message );
		io.sockets.in( roomID ).emit( 'message:private', msg );
		// Emit push notification
		socket.broadcast.to( roomID ).emit( 'push notification', msg );
	})

	socket.on('get:privs', function( roomID ) {
		socket.emit( 'messages', getRoomMessagesById( roomID) );
	})

	// Client asks for receiver when 
	// private chat is loaded
	socket.on('who:receiver', function(id) {
		socket.emit('receiver', getClientById(id) );
	})

	socket.on('join:room', function( roomID ) {
		// Room id will be the handsake
		console.log(socket.id + ' joining ' + roomID);
		socket.join( roomID );
		if ( isArrayEmpty(private_messages[roomID]) ) {
			private_messages[roomID] = [];
		}
	})

	socket.on('typing:true', function( user ) {
		socket.broadcast.emit( 'user typing', user.name);
	})

	socket.on('typing:false', function( user ) {
		socket.broadcast.emit( 'not typing', user.name);
	})

});

http.listen(process.env.PORT || 3000, function() {
	console.log("Chat successfully listen on 3000");
});

