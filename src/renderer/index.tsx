import 'core-js';
import './index.css';
// import "semantic-ui-css";
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import axios from 'axios';

axios.defaults.withCredentials = true;

render(<App />, document.getElementById('app'));
