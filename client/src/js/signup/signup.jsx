import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {TextInput} from './';


export class SignUp extends Component{
    constructor(){
        super();
    }

    render(){
        return(
    <section className="sign-up-section">
        <div className="sign-up-wrapper">
          <form className="sign-up-form">
            <header className="sign-up-form__header">Sign up</header>
            <TextInput type='username'/>
            <TextInput type='password'/>
            <TextInput type='confirm password'/>
            <div
              className="sign-up-form__input-wrapper sign-up-form__input-wrapper--flex"
            >
            </div>
          </form>
        </div>
      </section>
        );
    }
}
