import React, { Component } from "react";
import ReactDOM from "react-dom";
import { InputModel } from "./";

export class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model
    };
    this.getWrapperClassName = this.getWrapperClassName.bind(this);
    this.getPlaceholderClassName = this.getPlaceholderClassName.bind(this);
    this.getInputClassName = this.getInputClassName.bind(this);
  }

  getWrapperClassName() {
    var prefix = "sign-up-form__input-wrapper ";
    var suffix = this.state.model["isActive"]
      ? "sign-up-form__input-wrapper--active"
      : "";
    return prefix + suffix;
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
  getInputClassName(){
    var suffix = this.state.model.value === "" && !this.state.model.isActive ? "sign-up-form__input--hidden-date" : "";
    return "sign-up-form__input sign-up-form__input--date " + suffix;
  }

  render() {
    return (
      <div className={this.getWrapperClassName()}>
        <input
          type={this.state.model.type.toLowerCase()}
          onChange={this.state.model.onChangeHandler}
          onFocus={this.state.model.activityHandler}
          onBlur={this.state.model.activityHandler}
          className={this.getInputClassName()}
          name={this.state.model.name}
        />

        <div className={this.getPlaceholderClassName()}>
          {this.capitalize(this.state.model.placeholder)}
        </div>
      </div>
    );
  }
}
