import React from 'react';

import { MessageInput } from './input';

export class Room extends React.Component {
	render() {
		return (
			<div className="chat-messages">
				<div className="room-message"></div>
				<MessageInput handleEnter= {this.handleEnter} />
			</div>
		);
	}
}