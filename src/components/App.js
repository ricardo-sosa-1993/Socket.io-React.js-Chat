import React from 'react';
import UsernameInput from './username_input';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './chat';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      	<div>
      		<Switch>
      			<Route path="/chat/:nickname/:color" component={Chat}/>
		      	<Route path="/" component={UsernameInput}/>
	      	</Switch>
      	</div>
      </BrowserRouter>
    )
  }
}