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
		})
	}

	componentWillUnmount() {
		socket.emit( 'disconnect' );
	}

	render() {
		return (
				<div className="chat-list">
					<User users={this.state.users} />
				</div>
			);
	}
}

class User extends React.Component {
	constructor( props ) {
		super(props);
		this.handleColor = this.handleColor.bind( this );
	}

	handleColor( e ) {
		var item, chats = this.refs;
		for ( item in chats ) {
			chats[item].style.backgroundColor = 'transparent';
		}
		e.currentTarget.style.backgroundColor = "rgb(233, 235, 235)";
	}

	render() {
		var users = this.props.users.map( (usr, index) => {
			if ( usr.name == socket.nickname ) return ;
			return ( 
					<Link key={usr.id} to={`/private/${usr.id}`}>
						<div>
							<div className="item-wrapper" onClick={this.handleColor} ref={`chat-${usr.id}`}>
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