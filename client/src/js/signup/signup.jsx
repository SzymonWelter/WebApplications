import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {CheckboxInput, SubmitInput, TextInput} from '../';


export class SignUp extends Component{
    constructor(){
        super();
    }

    render(){
        return(
    <section className="log-in-section">
        <div className="log-in-wrapper">
          <form className="log-in-form">
            <header className="log-in-form__header">Log in</header>
            <div className="log-in-form__input-wrapper">
              <input
                type="text"
                className="log-in-form__input log-in-form__input--text"
                name="username"
                placeholder="Username"
              />
            </div>
            <div className="log-in-form__input-wrapper">
              <input
                type="password"
                className="log-in-form__input log-in-form__input--text"
                name="password"
                placeholder="Password"
              />
            </div>
            <div
              className="log-in-form__input-wrapper log-in-form__input-wrapper--flex"
            >
              <CheckboxInput />
              <SubmitInput />
            </div>
          </form>
        </div>
      </section>
        );
    }
}
