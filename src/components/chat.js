import React from 'react';
import ChatDetail from './chat_detail';
import { Container, Col, Row } from 'reactstrap';
import Socket from './socket';
import Event from './socket_event';



export default class Chat extends React.Component{
	constructor(props){
		super(props);
		this.state = { nickname: this.props.match.params.nickname,
					   color: this.props.match.params.color,
						messages: [],
						keyCount: 0
					};	

		this.onMessage = this.onMessage.bind(this);

	}

	onMessage(message){
		console.log(message);
		var messages = this.state.messages;
		messages.push(message)
		this.setState({messages: messages });
	}

  

	render(){
		return(
			<div>
				<Socket nickname={this.state.nickname}> 
					<Event name="message" handler={(message) => this.onMessage(message)}/>
					<Container>
					      <ChatDetail nickname={this.state.nickname} messageColor={this.state.color} messages={this.state.messages}/>			       
					</Container>
				 </Socket>
			</div>
		);
	}
}