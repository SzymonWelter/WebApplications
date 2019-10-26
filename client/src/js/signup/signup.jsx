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
            <div className="row">

            </div>
            <TextInput type='username' />
            <TextInput type='first name'/>
            <TextInput type='last name'/>
            <TextInput type='email' />
            <TextInput type='pesel' />
            <TextInput type='password' />
            <TextInput type='confirm password'/>
          </form>
        </div>
      </section>
        );
    }
}
