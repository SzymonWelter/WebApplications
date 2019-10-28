import React, { Component } from "react";
import ReactDOM from "react-dom";
import { InputModel } from "./";

export class ButtonInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model
    };
  }

  getPlaceholderClassName() {
    var prefix = "sign-up-form__input-placeholder ";
    var suffix =
      this.state.model["isActive"] || this.state.model["value"]
        ? "sign-up-form__input-placeholder--top "
        : "";
    suffix += this.state.model["isActive"]
      ? "sign-up-form__input-placeholder--active"
      : "";
    return prefix + suffix;
  }

  capitalize = text => {
    return text.toUpperCase();
  };

  render() {
    return (
      <div className="sign-up-form__input--button-wrapper">
        <input
          type={this.state.model.type.toLowerCase()}
          className={
            "sign-up-form__input sign-up-form__input--button sign-up-form__input--button-" +
            this.props.color +
            (this.props.valid ? "" : " sign-up-form__input sign-up-form__input--button-disabled")
          }
          name={this.state.model.name}
          value={this.state.model.name.toUpperCase()}
          onClick={this.props.onClickHandler}
        />
      </div>
    );
  }
}
