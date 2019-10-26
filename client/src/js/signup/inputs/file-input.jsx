import React, { Component } from "react";
import ReactDOM from "react-dom";
import { InputModel } from "./";

export class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model
    };
  }

  capitalize = text => {
    return text.toUpperCase();
  };

  render() {
    return (
      <div className="mt-3 sign-up-form__input-wrapper sign-up-form__input-wrapper--transparent">
        <input
          type={this.state.model.type.toLowerCase()} 
          onChange={(e) => {this.state.model.onChangeHandler(e)}}
          className="sign-up-form__input sign-up-form__input--file"
          name={this.state.model.name}
          accept="image/*"
        />
        <div className="sign-up-form__input--file-wrapper">
          Choose file
        </div>
        <div className="sign-up-form__input--file-label">
          {this.state.model.value}
        </div>
        <div className="sign-up-form__input-placeholder sign-up-form__input-placeholder--top sign-up-form__input-placeholder--grey">
          {this.capitalize(this.state.model.placeholder)}
        </div>
      </div>
    );
  }
}
