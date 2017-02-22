import React from 'react';

import { MessageList } from './message';
import { MessageInput } from './input';

export class Private extends React.Component {

	constructor( props ) {
		super(props);
		this.state = { messages: [], receiver: { name: ''} }
		this.handleEnter = this.handleEnter.bind( this );
	}

	handleEnter( text ) {
		var self = this;
			message = { 
			nickname: socket.nickname, 
			msg: text,
			color: socket.color
		}
		socket.emit('message:private', {
			"id": self.props.params.id,
			"msg": message
		});
	}

	addMessage( data ) {
		this.setState( (prevState) => ({
		  messages: prevState.messages.concat(data),
		}));
	}

	requestReceiver( id ) {
		socket.emit( 'who:receiver', id);
	}

	componentDidMount() {
		var self = this;
		this.mounted = true;
		socket.on( 'message:private', function (msg) {
			if ( self.mounted ) self.addMessage( msg );
		}.bind(this));
		socket.on( 'receiver', function( receiver ){
			if ( self.mounted ) self.setState({ "receiver": receiver });
		})
		this.requestReceiver( this.props.params.id );
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	// Workaround for react-router outside components error
	// so it updates succesfully receiver when switching
	// conversation
	componentWillReceiveProps(nextProps){
	    if (nextProps.params.id !== this.props.params.id) {
	    	this.requestReceiver( nextProps.params.id );
	    }
	}

	render() {
		return (
			<div key={this.props.params.id} className="chat-messages">
				<div className="header-right">
					<p>{this.state.receiver.name}</p>
				</div>
				<p>{this.props.params.id}</p>
				<MessageList messages = {this.state.messages} />
				<MessageInput handleEnter= {this.handleEnter} />
			</div>
		);
	}
}