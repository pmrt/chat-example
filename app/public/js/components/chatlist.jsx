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
	}

	render() {
		var users = this.props.users.map( (usr, index) => {
			if ( usr.name != socket.nickname ) {
				return ( 
						<User key={usr.id}
							  id={usr.id}
							  name={usr.name}
							  image={usr.image}
							  link={`/private/${usr.id}`} />
					);
			}
		});
		return (
				<div>
					<User key="general"
						  id="general"
						  image="https://d1fy1ym40biffm.cloudfront.net/images/default-avatar.png"
						  link="/"
						  name="General" />
					{users}
				</div>
			);
	}	
}

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = { preview: "" }
		this.handleColor = this.handleColor.bind( this );
		this.handleNotification = this.handleNotification.bind( this );
	}
	
	componentDidMount() {
		socket.on( 'push notification', function( lastMsg ) {
			var preview = lastMsg.msg,
				receiver = lastMsg.nickname;
			this.handleNotification( preview, receiver );			
		}.bind(this));
	}

	handleColor( e ) {
		var item, chats = this.refs;
		for ( item in chats ) {
			chats[item].style.backgroundColor = 'transparent';
		}
		e.currentTarget.style.backgroundColor = "rgb(233, 235, 235)";
	}

	handleNotification( preview, receiver) {
	// To do with react
	var i, wrapper, elem, item, chats = this.refs;
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

	render() {
		return (
			<Link to={this.props.link}>
				<div>
					<div data-name={this.props.name} className="item-wrapper" onClick={this.handleColor} ref={`chat-${this.props.id}`}>
							<img src={this.props.image} />
							<div className="text-wrapper">
								<p>{this.props.name}</p>
							</div>
					</div>
				</div>
			</Link>
		);
	}
}