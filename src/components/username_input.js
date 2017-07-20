import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';


export default class UsernameInput extends React.Component{
	constructor(props){
		super(props);
		this.state = { nickname: '', error: false, success: false};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.submitNickname = this.submitNickname.bind(this);
	}

	handleChange(event){
		this.setState({nickname: event.target.value});
	}

	handleClick(event){
		this.submitNickname();
	}

	handleSubmit(event){
		event.preventDefault();
		this.submitNickname();
	}

	submitNickname(){
		axios.get(`/nickname/${this.state.nickname}`)
		  .then((response) => {
		    this.setState({error: false, success: true});
		    console.log(response);
		    setTimeout(() => { this.props.history.push(`/chat/${this.state.nickname}/${response.data}`)},1000);
		  })
		  .catch((error) => {
		  	console.log("error");
		    this.setState({error: true, success: false});
		  });
	}

	nicknameError(){
		return (
			<Alert color="danger" style={{width: '50%',
								  marginLeft: 'auto',
								  marginRight: 'auto'}}>
				<strong>Oh snap!</strong> User already registered
		    </Alert>
		);
	}

	nicknameSuccess(){
		return (
			<Alert color="success" style={{width: '50%',
								  marginLeft: 'auto',
								  marginRight: 'auto'}}>
				Nickname registered successfully
		    </Alert>
		);
	}

	render() {

		return (
				<div>
					<Form onSubmit={this.handleSubmit} style={{padding: '20px 30px 20px 30px', 
								  width: '50%',
								  marginLeft: 'auto',
								  marginRight: 'auto', 
								  marginTop: '150px',
								  border: '1px solid #ddd',
								  boxShadow: '2px 2px 3px 0px rgba(0,0,0,0.2)'
								}}>
				        <FormGroup>
				          <Label>Nickname</Label>
				          <Input value={this.state.nickname} onChange={this.handleChange}/>
				        </FormGroup>
				        <div className="text-right">
				            <Button color="primary" onClick={this.handleClick}>Submit</Button>
				        </div>
				    </Form>
				    { this.state.error ? this.nicknameError() : this.state.success? this.nicknameSuccess() : null }
			    </div>
				)
	}
}

