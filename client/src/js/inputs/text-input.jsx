import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export class TextInput extends Component{



    constructor(){
        super();
    }

    render(){
        return(
          <div class="log-in-form__input-wrapper">
            <input
              type="text"
              class="log-in-form__input log-in-form__input--text"
              name="username"
              placeholder="Username"
            />
          </div>
        );
    }
}
