window.onload = setup;
const textInput = document.getElementById('input-text'),
	  button = document.getElementById('send-btn'),
	  ul = document.getElementById('messages-list'),
	  profile = document.getElementById('profile'),
	  colors = [
	  		{r: 46, g: 204, b: 113 },
	  		{r: 52, g: 152, b: 219 },
	  		{r: 192, g: 83, b: 221 },
	  		{r: 143, g: 168, b: 32 },
	  		{r: 222, g: 181, b: 45 },
	  		{r: 173, g: 71, b: 54 },
	  		{r: 22, g: 154, b: 24 },
	  		{r: 248, g: 126, b: 130 }
	  ];

var lastMessageNick = '';

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
		  	profile.src = images.large || images.medium;
	  }
	});
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

function setup() {
	var color = set( 'color', choice(colors) );
	getRandomName();
	textInput.addEventListener('keyup', (e) => { 
		var message = getMessage();
		if ( message ) {
			if ( e.keyCode === 13 ) { 
				send( message );
				addMessage( socket.nickname, message, socket.color, 'right-bubble-wrapper' );
				textInput.value = '';
			}
		}
	});
}