import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export class TextInput extends Component{

    constructor(props){
        super(props);
    }

    capitalize(text){
      return text.toUpperCase();
    }

    render(){
        return(
          <div className="sign-up-form__input-wrapper sign-up-form__input-wrapper--active">
            <input
              type={this.props.type.toLowerCase().includes('password') ? 'password' : 'text'}
              className="sign-up-form__input sign-up-form__input--text"
              name={this.props.type.replace(' ','')}
            />
            <div className="sign-up-form__input-placeholder sign-up-form__input-placeholder--active sign-up-form__input-placeholder--top">
              {this.capitalize(this.props.type)}
            </div>  
          </div>
        );
    }
}
