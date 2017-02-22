function setDefaults() {
	var nick;
	$.ajax({
	  url: 'https://randomuser.me/api/',
	  dataType: 'json',
	  success: ( data ) => {
		  	let name = data.results[0].name,
		  		images = data.results[0].picture;
		  	nick = name.first + " " + name.last;
		  	set( 'nickname', capitalize(nick) );
		  	profilePic.src = images.large || images.medium;
		  	set( 'image', profilePic.src);
		  	getColors();

		  	// When socket has loaded and got
		  	// random name and colors
		  	socket.emit('loaded', {
		  		name: socket.nickname,
		  		id: socket.id,
		  		image: socket.image
		  	});
	  }
	});
}

function set( prop, value ) {
	socket[prop] = value;
	return value;
}

function getColors() {
	var color, rgb = choice( colors );
	color = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
	set( 'color', color);
}

function choice(arr) {
  return arr[ Math.floor(Math.random() * arr.length) ];
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTime() {
	return new Date().toLocaleTimeString(navigator.language, 
		{
			hour: '2-digit', 
			minute:'2-digit',
			hour12: 'true'
		}
	);
}