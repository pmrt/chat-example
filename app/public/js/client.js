const socket = io();

socket.on('message', function( data ) {
	addMessage( data.nick, data.msg, data.color );
})

function send( msg ) {
	socket.emit('message', { 
		nick: socket.nickname, 
		msg: msg,
		color: socket.color 
	});
}

function set( prop, value ) {
	socket[prop] = value;
	return value;
}