import React from 'react';

import { MessageList } from './message';
import { MessageInput } from './input';

export class Private extends React.Component {

	constructor( props ) {
		super(props);
		this.state = { messages: [], receiver: { name: ''}, room: '' }
		this.handleEnter = this.handleEnter.bind( this );
	}

	handleEnter( text ) {
		var self = this,
			message = { 
			nickname: socket.nickname, 
			msg: text,
			color: socket.color
		}
		socket.emit('message:private', {
			"message": message,
			"room": this.state.room
		});
	}

	getHandShake() {
		var clientID = socket.id,
			receiverID = this.props.params.id, 
			// Order doesn't really matter,
			// what matters is that is sorted
			// with the same algorithm within 
			//server and client
			handshake = [clientID, receiverID].sort().join('');
			this.setState({ room: handshake });
		return handshake;
	}

	addMessage( data ) {
		if ( !isArrayEmpty( data) ) {
			this.setState( (prevState) => ({
			  messages: prevState.messages.concat(data),
			}));
		}
	}

	requestReceiver( id ) {
		socket.emit( 'who:receiver', id);
	}

	requestPreviousMessages() {
		socket.emit('get:privs', this.getHandShake() );
	}

	componentDidMount() {
		var self = this;
		this.mounted = true;
		socket.on( 'messages', function(msgs) {
			if ( self.mounted  && !isArrayEmpty(msgs) ) self.setState({
				messages: msgs
			})
		}.bind(this));
		socket.on( 'message:private', function (msg) {
			if ( self.mounted ) self.addMessage( msg );
		}.bind(this));
		socket.on( 'receiver', function( receiver ){
			if ( self.mounted ) self.setState({ "receiver": receiver });
		}.bind(this));
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	// Workaround for react-router outside components error
	// so it updates succesfully receiver when switching
	// conversation
	componentWillReceiveProps(nextProps){
		this.setState({
			messages: []
		})
	    if (nextProps.params.id !== this.props.params.id) {
	    	this.requestReceiver( nextProps.params.id );
	    }
	    socket.emit( 'join:room', this.getHandShake() );
	    this.requestReceiver( this.props.params.id );
	    this.requestPreviousMessages();
	}

	render() {
		return (
			<div className="chat-messages">
				<div className="header-right">
					<div className="thumbail-wrapper">
						<img src={this.state.receiver.image} />
					</div>
					<div className="header-text">
						<p>{this.state.receiver.name}</p>
					</div>
				</div>
				<MessageList messages = {this.state.messages} />
				<MessageInput handleEnter= {this.handleEnter} />
			</div>
		);
	}
}