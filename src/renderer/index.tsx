import 'core-js';
import './index.css';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import axios from 'axios';
import { initTheme } from './functions/initTheme';

axios.defaults.withCredentials = true;

initTheme();

render(<App />, document.getElementById('app'));
