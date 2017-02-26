import React from 'react';

import { MessageList } from './message';
import { MessageInput } from './input';

var firstMount = true;

export class MessageApp extends React.Component {

	constructor( props ) {
		super(props);
		this.state = { 
			messages: [], 
			typingMsg: 'this is a test message typing...', 
			typingName: '', 
			name: '', 
			profile: 'https://d1fy1ym40biffm.cloudfront.net/images/default-avatar.png'
		};
		this.handleEnter = this.handleEnter.bind( this );
		this.handleModalKeyUp = this.handleModalKeyUp.bind( this );
		this.modalHide = this.modalHide.bind( this );
		this.setDefaults = this.setDefaults.bind( this );
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
			this.setState({
				name: socket.nickname
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

		socket.on( 'user:connected', function( user ) {
			var message = { 
				nickname: "server-msg", 
				msg: user[user.length-1].name + " se ha conectado.",
				color: null
			}
			this.setState( (prevState) => ({
				messages: prevState.messages.concat( message )
			}));
		}.bind(this));

		socket.on( 'user:disconnect', function( name ) {
			var message = { 
				nickname: "server-msg", 
				msg: name + " se ha desconectado.",
				color: null
			}
			this.setState( (prevState) => ({
				messages: prevState.messages.concat( message )
			}));
		}.bind(this));

		if ( firstMount ) {
			this.setDefaults();
		}

	}

	setDefaults() {
		var nick, context = this;
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

			  	context.setState({
			  		name: socket.nickname,
			  		profile: socket.image
			  	})
			  	set( 'notFirstTime', true );
		  }
		});
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	handleModalKeyUp( e ) {
		var value  = e.currentTarget.value;
		if (this.mounted) this.setState({ name: value});

		if ( e.keyCode === 13 ) {
			this.modalHide();
		}
	}

	modalHide() {
		socket.nickname = this.state.name;
		firstMount = false;
		socket.emit('loaded', {
			name: socket.nickname,
			id: socket.id,
			image: socket.image
		});
		this.forceUpdate();
	}

	render() {
		if ( firstMount ) {
			return (
					<div className="super-bg">
						<div className="user-modal">
							<div className="user-header">
								<div className="user-img-wrapper">
									<img src={this.state.profile} />
								</div>
								<div className="user-p-wrapper">
									<p>{this.state.name}</p>
								</div>
							</div>
							<div className="user-text">
								<input onKeyUp={this.handleModalKeyUp}/>
							</div>
							<div className="user-button-wrapper">
								<a className="button" onClick={this.modalHide}>Entrar</a>
							</div>
						</div>
					</div>
				);
		} else {
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

}
