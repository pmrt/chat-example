import React from 'react';
import ReactDOM from 'react-dom';

export class MessageApp extends React.Component {

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
		//this.addMessage( message );
	}

	addMessage( data ) {
		this.setState( (prevState) => ({
		  messages: prevState.messages.concat(data),
		}));
	}

	componentDidMount() {
		socket.emit('loaded');
		socket.once( 'messages', function(msgs) {
			this.setState({
				messages: msgs
			})
		}.bind(this));
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


export class MessageInput extends React.Component {
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
		var direction;
		return this.props.messages.map( (msg, index) => {
			if ( msg.nickname === socket.nickname ) {
				direction = 'right-bubble-wrapper'
			} else {
				direction = 'left-bubble-wrapper'
			}
			return (
					<Message
							key={msg.id}
							id={msg.id}
							direction={direction}
							msg={msg.msg}
							name={msg.nickname}
							color={msg.color}
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


export class Message extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		if ( lastSender == this.props.name ) {
			this.refs["arrow-"+this.props.id].style.display = 'none';
			this.refs["name-"+this.props.id].style.display = 'none';
			this.refs["wrapper-" +this.props.id].style.marginTop = '8px';
		}
		let me = ReactDOM.findDOMNode(this);
		me.scrollIntoView();
		lastSender = this.props.name;
	}

	render() {
		var classArrow = "bubble-arrow ",
			direction = this.props.direction;
		if ( direction == 'right-bubble-wrapper' ) {
			classArrow += " alt"
		}
		return (
			<div ref={"wrapper-" +this.props.id} className={direction}>
				<div className="bubble">
				  <div className="txt">
				    <p style={{color: this.props.color}} className="name" ref={"name-" +this.props.id}>{this.props.name}</p>
				    <p className="message">{this.props.msg}</p>
				    <span className="timestamp">{getTime()}</span>
				  </div>
				  <div className={classArrow} ref={"arrow-" +this.props.id}></div>
				</div>
			</div>
		);
	}	
}


ReactDOM.render(<MessageApp />, rootNode);