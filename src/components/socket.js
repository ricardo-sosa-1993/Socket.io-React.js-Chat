import React from 'react';



export default class Socket extends React.Component{


	constructor(props){
		super(props);
		console.log("socket contructor");
		this.io = io();
		this.setHandlers();
		console.log(this.io);
		console.log(this.io.id);
		this.io.once('connect', () => {this.io.emit('join', Object.assign({},{nickname: this.props.nickname},{id: this.io.id}))});

	}


	setHandlers(){
		this.getEvents().map( (event) => this.io.on(event.props.name,event.props.handler));
	}

	getEvents(){
		return this.props.children.filter((child) =>  child.type.displayName === 'Event');
	}


	getChildContext() {
    return {io: this.io};
  }

	render(){
		return <div>{this.props.children}</div>;
	}
}

Socket.childContextTypes = {
	  io: React.PropTypes.object
};

