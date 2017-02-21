window.onload = setup;

function setup() {
	getRandomName();
	getColors();
}

const socket = io();