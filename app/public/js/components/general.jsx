import React from 'react';

import { MessageList } from './message';
import { MessageInput } from './input';

export class MessageApp extends React.Component {

	constructor( props ) {
		super(props);
		this.state = { messages: [], typingMsg: '', typingName: '' }
		this.firstMount = true;
		this.handleEnter = this.handleEnter.bind( this );
	}

	handleEnter( text ) {
		var message = { 
			nickname: socket.nickname, 
			msg: text,
			color: socket.color
		}
		socket.emit('message', message);
	}

	addMessage( data ) {
		this.setState( (prevState) => ({
		  messages: prevState.messages.concat(data),
		}));
	}

	componentDidMount() {
		this.mounted = true;

		socket.on( 'messages', function(msgs) {
			if ( this.mounted ) this.setState({
				messages: msgs
			})
		}.bind(this));
		socket.on( 'message', function (msg) {
			if ( this.mounted) this.addMessage( msg );
		}.bind(this));

		if ( socket.notFirstTime ) {
			socket.emit('loaded', {
				name: socket.nickname,
				id: socket.id,
				image: socket.image
			}, false);
		}
		socket.on('user typing', function( name ) {
			this.setState({
				typingMsg: name + " está escribiendo...",
				typingName: name
			});
		}.bind(this));

		socket.on('not typing', function( name ) {
			if ( name == this.state.typingName )
			this.setState({
				typingMsg: '',
				typingName: ''
			});
		}.bind(this));

	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		return (
				<div className="chat-messages">
					<div className="header-right">
						<div className="thumbail-wrapper">
							<img src="https://d1fy1ym40biffm.cloudfront.net/images/default-avatar.png" />
						</div>
						<div className="header-text">
							<p> General </p>
							<div className="typing-wrapper">
								<p>{ this.state.typingMsg }</p>
							</div>
						</div>
					</div>
					<MessageList messages = {this.state.messages} />
					<MessageInput handleEnter= {this.handleEnter} />
				</div>
			);
	}

}
