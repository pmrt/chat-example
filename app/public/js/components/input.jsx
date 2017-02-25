import React from 'react';

export class MessageInput extends React.Component {
	constructor(props){
		super(props);
		this.state = { text: ''}
		this.firstType = true;
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleTyping() {
		if ( this.firstType ) socket.emit( 'typing:true', { name: socket.nickname });
		if ( this.timer ) clearInterval( this.timer );
		this.timer = setTimeout( ()=> {
			socket.emit( 'typing:false', { name: socket.nickname });
			this.firstType = true;
		}, 1500);
		this.firstType = false;
	}

	handleKeyUp( e ) {
		this.handleTyping();
		if ( this.state.text && e.keyCode  === 13 ) {
			this.props.handleEnter( this.state.text );
			this.setState({ text: '' });
		}
	}

	handleChange(e) {
	  this.setState({text: e.target.value});
	}

	render() {
		return (
				<div className="chat-input">
					<div className="emoji">
						<img width="24" height="24" src="./img/emoji.png" alt=""/>
					</div>
					<input
					   onChange={this.handleChange}
					   onKeyUp={this.handleKeyUp}
					   value={this.state.text}
					   className="chat-text" 
					   id="input-text" 
					   placeholder="Escribe un mensaje aquí" 
					   type="text" />
				</div>
			);
	}
}
