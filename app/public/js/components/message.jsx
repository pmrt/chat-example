import React from 'react';
import ReactDOM from 'react-dom';

import { MessageInput } from './input';

export class MessageList extends React.Component {
	constructor(props) {
		super(props);
	}

	fetchMessages() {
		var direction;
		return this.props.messages.map( (msg, index) => {
			if ( msg.nickname === socket.nickname ) {
				direction = 'right-bubble-wrapper'
			} else {
				direction = 'left-bubble-wrapper'
			}
			return (
					<Message
							key={msg.id}
							id={msg.id}
							direction={direction}
							msg={msg.msg}
							name={msg.nickname}
							color={msg.color}
					/>
				);
		});
	}

	render() {
		let messages = this.fetchMessages();
		return (
			<div id="message-list" className="messages">
				{messages}
			</div>

		);
	}
}


class Message extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		if ( lastSender == this.props.name ) {
			this.refs["arrow-"+this.props.id].style.display = 'none';
			this.refs["name-"+this.props.id].style.display = 'none';
			this.refs["wrapper-" +this.props.id].style.marginTop = '8px';
		}
		let me = ReactDOM.findDOMNode(this);
		me.scrollIntoView();
		lastSender = this.props.name;
	}

	render() {
		var classArrow = "bubble-arrow ",
			direction = this.props.direction;
		if ( direction == 'right-bubble-wrapper' ) {
			classArrow += " alt"
		}
		return (
			<div ref={"wrapper-" +this.props.id} className={direction}>
				<div className="bubble">
				  <div className="txt">
				    <p style={{color: this.props.color}} className="name" ref={"name-" +this.props.id}>{this.props.name}</p>
				    <p className="message">{this.props.msg}</p>
				    <span className="timestamp">{getTime()}</span>
				  </div>
				  <div className={classArrow} ref={"arrow-" +this.props.id}></div>
				</div>
			</div>
		);
	}	
}



