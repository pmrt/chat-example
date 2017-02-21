window.onload = setup;

function setup() {
	var color = set( 'color', choice(colors) );
	getRandomName();
	getColors();
	// textInput.addEventListener('keyup', (e) => { 
	// 	var message = getMessage();
	// 	if ( message ) {
	// 		if ( e.keyCode === 13 ) { 
	// 			send( message );
	// 			addMessage( socket.nickname, message, socket.color, 'right-bubble-wrapper' );
	// 			emptyInput();
	// 		}
	// 	}
	// });
}