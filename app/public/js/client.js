const socket = io();

function send( msg ) {
	console.log( msg );
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