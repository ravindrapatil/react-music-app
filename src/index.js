import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Tools needed

// react and react-router-dom
// Frame Motion - An open source React library to power production-ready animations.
// React Window -  React window works by only rendering part of a large data set (just enough to fill the viewport).
// react swipeable
// react circular slider 
// axios - promise base http types
// Dexie.js 
// Dexie.Observable 
// reCAPTCHA v3
