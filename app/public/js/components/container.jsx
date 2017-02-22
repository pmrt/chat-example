import React from 'react';

import { MessageApp } from './general';
import { ChatList } from './chatlist';

export class Container extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<div>
					<ChatList />
					{this.props.children}
				</div>
			);
	}
}