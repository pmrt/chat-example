window.onload = setup;

function setup() {
	var color = set( 'color', choice(colors) );
	getRandomName();
	getColors();
}

const socket = io();