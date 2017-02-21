function getRandomName() {
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
	  }
	});
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

// TODO WITH REACT
function addMessage( nickname, msg, color, direction ) {
	let wrapper, bubble, text, name, message, timestamp, arrow;
	direction = direction || "left-bubble-wrapper";

	wrapper = document.createElement('div');
	wrapper.className = direction;
	bubble = document.createElement('div');
	bubble.className = "bubble";
	text = document.createElement('div');
	text.className = "txt";
	name = document.createElement('p');
	name.className = "name";
	name.innerHTML = nickname;
	name.style.color = "rgb("+ color.r + "," + color.g + "," + color.b + ")";
	message = document.createElement('message');
	message.className = "message";
	message.innerHTML =  msg ;
	timestamp = document.createElement('span');
	timestamp.className = "timestamp";
	timestamp.innerHTML =  getTime();
	arrow = document.createElement('div');
	arrow.className = "bubble-arrow";

	if ( nickname === lastMessageNick ) {
		arrow.style.display = 'none';
		name.style.display = 'none';
		wrapper.style.marginTop = '8px';
	}


	text.appendChild( name );
	text.appendChild( message );
	text.appendChild( timestamp );
	bubble.appendChild( text );
	bubble.appendChild( arrow );
	wrapper.appendChild( bubble );
	document.getElementById('message-list').appendChild(wrapper);
	wrapper.scrollIntoView();
	lastMessageNick = nickname;
}

function getMessage() {
	return textInput.value;
}

function emptyInput() {
	textInput.value = '';
}