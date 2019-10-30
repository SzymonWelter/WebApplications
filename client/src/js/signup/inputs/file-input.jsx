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

  ifError = () => {
    if (!this.state.model.valid) {
      return (
        <label className="sign-up-form__input-label-error">
          {this.state.errorMessage}
        </label>
      );
    }
    return (
      <div className="sign-up-form__input-placeholder sign-up-form__input-placeholder--top sign-up-form__input-placeholder--grey">
        {this.capitalize(this.state.model.placeholder)}
      </div>
    );
  };

  render() {
    return (
      <div className="mt-3 sign-up-form__input-wrapper sign-up-form__input-wrapper--transparent">
        <input
          type={this.state.model.type.toLowerCase()}
          onChange={this.props.onChange}
          className="sign-up-form__input sign-up-form__input--file"
          name={this.state.model.name}
          accept="image/*"
        />
        <div className="sign-up-form__input--file-wrapper">
          <label>Choose file</label>{" "}
          <div className="sign-up-form__input--file-label">
            {this.state.model.value}
          </div>
        </div>

        {this.ifError()}
      </div>
    );
  }
}
