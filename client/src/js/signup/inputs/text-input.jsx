import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export class TextInput extends Component{

    constructor(props){
        super(props);
    }

    capitalizeFirstLetter(text){
      return text[0].toUpperCase() + text.slice(1)
    }

    render(){
        return(
          <div className="sign-up-form__input-wrapper">
            <input
              type={this.props.type.toLowerCase().includes('password') ? 'password' : 'text'}
              className="sign-up-form__input sign-up-form__input--text"
              name={this.props.type.replace(' ','')}
              placeholder={this.capitalizeFirstLetter(this.props.type)}
            />
          </div>
        );
    }
}
