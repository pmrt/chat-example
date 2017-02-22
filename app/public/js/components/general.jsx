import React from 'react';

import { MessageList } from './message';
import { MessageInput } from './input';

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
	}

	addMessage( data ) {
		this.setState( (prevState) => ({
		  messages: prevState.messages.concat(data),
		}));
	}

	componentDidMount() {
		this.mounted = true;
		socket.once( 'messages', function(msgs) {
		this.setState({
			messages: msgs
		})
		}.bind(this));
		socket.on( 'message', function (msg) {
			if ( this.mounted) this.addMessage( msg );
		}.bind(this));
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		return (
				<div className="chat-messages">
					<div className="header-right">
						<p> General </p>
					</div>
					<MessageList messages = {this.state.messages} />
					<MessageInput handleEnter= {this.handleEnter} />
				</div>
			);
	}

}
