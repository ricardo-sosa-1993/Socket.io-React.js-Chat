/* eslint-disable import/default */

import 'babel-polyfill' ;
import React from 'react';  
import { render } from 'react-dom';  
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';

render(  
 <App />,
 document.getElementById('main')
);