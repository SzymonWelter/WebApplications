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
    let suffix =
      this.state.model.isValid &&
      this.state.model.value &&
      !this.state.model.isActive
        ? "sign-up-form__input-wrapper--valid "
        : "";
    suffix += this.state.model.isActive
      ? "sign-up-form__input-wrapper--active "
      : "sign-up-form__input-wrapper--inactive ";
    suffix += !this.state.model.isValid
      ? "sign-up-form__input-wrapper--error "
      : "";
    return prefix + suffix;
  }

  getPlaceholderClassName() {
    var prefix = "sign-up-form__input-placeholder ";
    var suffix =
      this.state.model.isActive || this.state.model.value
        ? "sign-up-form__input-placeholder--top "
        : "";
    suffix += this.state.model.isActive
      ? "sign-up-form__input-placeholder--active "
      : "";
    suffix +=
      this.state.model.isValid && this.state.model.value && !this.state.model.isActive
        ? "sign-up-form__input-placeholder--valid "
        : "";
    suffix +=
      !this.state.model.isValid &&
      (this.state.model.isActive || this.state.model.value)
        ? "sign-up-form__input-placeholder--error "
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
  ifError = () => {
    if (!this.state.model.isValid) {
      return (
        <label className="sign-up-form__input-label-error">
          {this.getErrorMessage()}
        </label>
      );
    }
  };

  getErrorMessage = () => {
    return this.isEmpty() ? "Input is required" : this.state.model.errorMessage;
  }

  isEmpty = () => {
    return this.state.model.value === undefined || this.state.model.value.length === 0;
  }

  render() {
    return (
      <div className={this.getWrapperClassName()}>
        <input
          type={this.state.model.type.toLowerCase()}
          onChange={this.props.onChange}
          onFocus={this.props.onActivity}
          onBlur={this.props.onActivity}
          className={this.getInputClassName()}
          name={this.state.model.name}
        />
        
        <div className={this.getPlaceholderClassName()}>
          {this.capitalize(this.state.model.placeholder)}
        </div>
        {this.ifError()}
      </div>
    );
  }
}
