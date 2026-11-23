import "isomorphic-fetch"
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './js/components/App';

// ReactDOM.render(<App />, document.getElementById('root'));

const wrapper = document.getElementById("calendar");
wrapper ? ReactDOM.render(<App />, wrapper) : false;