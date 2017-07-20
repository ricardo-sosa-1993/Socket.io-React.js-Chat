import React from 'react';
import { Alert, Container } from 'reactstrap';


const myMessageStyle = {
	textAlign: "right"
};

const messageStyle = {
	marginTop: "2%",
	paddingBottom: "2px"
};

const topMargin = {
	marginTop: "5%"
};

const chatInput = {
    bottom: '20px',
    width: '80%',
    position: 'fixed',
    marginLeft: 'auto',
    marginRight: 'auto'
};



 var colors = ["info","warning","danger"];

 var keyCount = 0;

export default class ChatDetail extends React.Component{
	constructor(props,context){
		super(props);
		this.state = {message: ""};
		this.renderMessages = this.renderMessages.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.getMessage = this.getMessage.bind(this);
	}

	sumKey(){
		keyCount++;
		return keyCount;
	}



	getMessage(message){
		return (
			<Alert key={this.sumKey()} color={(message.user === this.props.nickname) ? "Success" : colors[message.color]} style={ (message.user === this.props.nickname) ? Object.assign({},messageStyle,myMessageStyle) : messageStyle}>
		    	<strong>{message.user}</strong> {message.message} <p><small >{message.time}</small></p>
			</Alert>
		);
	}

	renderMessages(){
		console.log(this.props);
		return this.props.messages.map(message => {
				 return this.getMessage(message);
		});
	}

	handleClick(){
			this.context.io.emit("message",{message: this.state.message, user: this.props.nickname, color: this.props.messageColor, time: this.getTime()});
	}

	getTime(){
		console.log("time");
		console.log(this);
		var d = new Date();
		return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(); 
	}

	handleChange(message){
		this.setState({message});
	}

	render(){
		return (
                <div>
                	<Container style={topMargin}>
                	 {this.renderMessages()}
				     <div style={chatInput}>
	                    <div className="input-group">
	                        <input value={this.state.message} onChange={event => this.handleChange(event.target.value)} type="text" className="form-control input-sm" placeholder="Type your message here..." />
	                        <span className="input-group-btn">
	                            <button onClick={this.handleClick} className="btn btn-warning btn-sm" id="btn-chat">
	                                Send</button>
	                        </span>
	                    </div>
	                </div>
				     </Container>
                </div>
	    );
	}
}

ChatDetail.contextTypes = {
  io: React.PropTypes.object
};