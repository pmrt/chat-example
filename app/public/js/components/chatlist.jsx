import React from 'react';
import { hashHistory, Link } from 'react-router';

export class ChatList extends React.Component {
	constructor( props ) {
		super(props);
		this.state = { users: [] }
	}

	componentDidMount() {
		var self = this;
		socket.on( 'user:update', function( data ) {
			self.setState( (prevState) => ({
			  users: data
			}));
		}.bind(this));
	}

	componentWillUnmount() {
		socket.emit( 'disconnect' );
	}

	render() {
		return (
				<div className="chat-list">
					<UserList users={this.state.users} />
				</div>
			);
	}
}

// TODO Split up users from userlist
class UserList extends React.Component {
	constructor( props ) {
		super(props);
		this.handleColor = this.handleColor.bind( this );
		this.handleNotification = this.handleNotification.bind( this );
	}

	handleColor( e ) {
		var item, chats = this.refs;
		for ( item in chats ) {
			chats[item].style.backgroundColor = 'transparent';
		}
		e.currentTarget.style.backgroundColor = "rgb(233, 235, 235)";
	}

	handleNotification( preview, receiver) {
		// To do with react ( Needs to split up users from userlist )
		var wrapper, elem, item, chats = this.refs;
		for ( item in chats ) {
			if ( chats[item].textContent == receiver ) {
			    wrapper = document.createElement( 'div' );
			    wrapper.className = 'notification';
				elem = document.createElement( 'p' );
				elem.innerHTML = preview;
				wrapper.appendChild( elem );
				chats[item].appendChild( wrapper );
			}
		}
	}


	componentDidMount() {
		socket.on( 'push notification', function( lastMsg ) {
			var preview = lastMsg.msg,
				receiver = lastMsg.nickname;
			this.handleNotification( preview, receiver );			
		}.bind(this));
	}

	render() {
		var users = this.props.users.map( (usr, index) => {
			if ( usr.name == socket.nickname ) return ;
			return ( 
					<Link key={usr.id} to={`/private/${usr.id}`}>
						<div>
							<div data-name={usr.name} className="item-wrapper" onClick={this.handleColor} ref={`chat-${usr.id}`}>
									<img src={usr.image} />
									<div className="text-wrapper">
										<p>{usr.name}</p>
									</div>
							</div>
						</div>
					</Link>
				);
		});
		return (
				<div>
					<Link to={`/`}>
						<div>
							<div className="item-wrapper" onClick={this.handleColor} ref={`chat-general`}>
									<img src="https://d1fy1ym40biffm.cloudfront.net/images/default-avatar.png"/>
									<div className="text-wrapper">
										<p>General</p>
									</div>
							</div>
						</div>
					</Link>
					{users}
				</div>
			);
	}	
}

class User extends React.Component {
	
}