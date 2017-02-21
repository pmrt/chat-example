import React from 'react';
import ReactDOM from 'react-dom';

class MessageApp extends React.Component {

	constructor( props ) {
		super(props);
		this.state = { messages: [] }
		this.handleEnter = this.handleEnter.bind( this );
	}

	handleEnter( text ) {
		var message = { 
			nickname: socket.nickname, 
			msg: text,
			color: socket.color 
		}
		socket.emit('message', message);
		message['direction'] = 'right-bubble-wrapper'; 
		this.addMessage( message );
	}

	addMessage( data ) {
		this.setState( (prevState) => ({
		  messages: prevState.messages.concat(data),
		}));
	}

	componentDidMount() {
		socket.on( 'message', function (msg) {
			this.addMessage( msg )
		}.bind(this));
	}

	render() {
		return (
				<div className="chat-messages">
					<MessageList messages = {this.state.messages} />
					<MessageInput handleEnter= {this.handleEnter} />
				</div>
			);
	}

}


class MessageInput extends React.Component {
	constructor(props){
		super(props);
		this.state = { text: ''}
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleKeyUp( e ) {
		if ( this.state.text && e.keyCode  === 13 ) {
			this.props.handleEnter( this.state.text );
			this.state.text = '';
		}
	}

	handleChange(e) {
	  this.setState({text: e.target.value});
	}

	render() {
		return (
				<div className="chat-input">
					<div className="emoji">
						<img width="24" height="24" src="./img/emoji.png" alt=""/>
					</div>
					<input
					   onChange={this.handleChange}
					   onKeyUp={this.handleKeyUp}
					   value={this.state.text}
					   className="chat-text" 
					   id="input-text" 
					   placeholder="Escribe un mensaje aquí" 
					   type="text" />
				</div>
			);
	}
}


class MessageList extends React.Component {
	constructor(props) {
		super(props);

	}

	fetchMessages() {
		var self = this, sameUser = false;
		return this.props.messages.map( (msg, index) => {
			var direction = msg.direction || 'left-bubble-wrapper';
			return (
					<Message
							key={index}
							direction={direction}
							msg={msg.msg}
							name={msg.nickname}
					/>
				);
		});
	}

	render() {
		let messages = this.fetchMessages();
		return (
			<div id="message-list" className="messages">
				{messages}
			</div>

		);
	}
}


class Message extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		let me = ReactDOM.findDOMNode(this);
		me.scrollIntoView();
	}

	render() {
		var classArrow = "bubble-arrow ",
			direction = this.props.direction;
		if ( direction == 'right-bubble-wrapper' ) {
			classArrow += " alt"
		}
		return (
			<div className={direction}>
				<div className="bubble">
				  <div className="txt">
				    <p className="name">{this.props.name}</p>
				    <p className="message">{this.props.msg}</p>
				    <span className="timestamp">{getTime()}</span>
				  </div>
				  <div className={classArrow}></div>
				</div>
			</div>
		);
	}	
}

class AfterMessage extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		let me = ReactDOM.findDOMNode(this);
		me.scrollIntoView();
	}

	render() {
		console.log( this.props.msg );
		return (
			<div className={this.props.direction + ' after-message'}>
				<div className="bubble">
				  <div className="txt">
				    <p className="message">{this.props.msg}</p>
				    <span className="timestamp">{getTime()}</span>
				  </div>
				</div>
			</div>
		);
	}	
}

ReactDOM.render(<MessageApp />, rootNode);


























/*

export class MessageApp extends React.Component {
	constructor( props ) {
		super( props );
		this.state = { messages: [], input: '' };
	}

	handleEnter( event, text) {
		if ( text && event.keyCode === 13 ) {
			send( text );

			let newMsg = {
				direction
			}
			this.setState( (prevState) => ({
				messages: prevState.messages.concat( newMsg )
			}));
		}
	}

	render() {
		var msgUI;
		if ( nickname === name ) {
			msgUI = <AfterMessage />;
		} else {
			msgUI = <Message />;
		}

		return (
			<div className="chat-messages">
				{msgUI}
				<MessageInput handleEnter={this.handleEnter} />
			</div>
		);
	}

}
	
export class MessageInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = { text = '' }
	}

	render() {
		return (
			<div className="chat-input">
				<div className="emoji">
					<img width="24" height="24" src="./img/emoji.png" alt=""/>
				</div>
				<input 
				   onKeyUp={this.props.handleEnter(this.state.text)}
				   value={this.state.text}
				   className="chat-text" 
				   id="input-text" 
				   placeholder="Escribe un mensaje aquí" 
				   type="text" />
			</div>
		);
	}

}

export class Message extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<div className={this.props.direction}>
				<div className="bubble">
				  <div className="txt">
				    <p className="name">{this.props.name}</p>
				    <p className="message">{this.props.msg}</p>
				    <span className="timestamp">{getTime()}</span>
				  </div>
				  <div className="bubble-arrow"></div>
				</div>
			</div>
		);
	}	
}

export class AfterMessage extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<div className={this.props.direction}>
				<div className="bubble">
				  <div className="txt">
				    <p className="message">{this.props.msg}</p>
				    <span className="timestamp">{getTime()}</span>
				  </div>
				</div>
			</div>
		);
	}

}


function addMessage( nickname, msg, color, direction ) {
	if ( nickname === lastMessageNick )
	ReactDOM.render( <MessageComponent 
							name={nickname} 
							msg={msg} 
							color={color} 
							direction={direction} />, rootNode);
}
*/
/*
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
} */