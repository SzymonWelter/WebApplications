import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.scss";
import React from 'react';
import ReactDOM from 'react-dom'
import {SignUp} from './js/signup/signup.jsx';

ReactDOM.render(
      <SignUp />,
  document.getElementById("root")
);