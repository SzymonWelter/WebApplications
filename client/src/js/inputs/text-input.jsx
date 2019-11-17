import React, { Component } from "react";
import ReactDOM from "react-dom";
import { InputModel } from "./";

export class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model
    };
    this.getWrapperClassName = this.getWrapperClassName.bind(this);
    this.getPlaceholderClassName = this.getPlaceholderClassName.bind(this);
  }

  getWrapperClassName() {
    var prefix = "input-wrapper ";
    let suffix =
      this.state.model.isValid &&
      this.state.model.value &&
      !this.state.model.isActive
        ? "input-wrapper--valid "
        : "";
    suffix += this.state.model.isActive
      ? "input-wrapper--active "
      : "input-wrapper--inactive ";
    suffix += !this.state.model.isValid
      ? "input-wrapper--error "
      : "";
    return prefix + suffix;
  }

  getPlaceholderClassName() {
    var prefix = "input-placeholder ";
    var suffix =
      this.state.model.isActive || this.state.model.value
        ? "input-placeholder--top "
        : "";
    suffix += this.state.model.isActive
      ? "input-placeholder--active "
      : "";
    suffix +=
      this.state.model.isValid && this.state.model.value && !this.state.model.isActive
        ? "input-placeholder--valid "
        : "";
    suffix +=
      !this.state.model.isValid &&
      (this.state.model.isActive || this.state.model.value)
        ? "input-placeholder--error "
        : "";
    return prefix + suffix;
  }

  capitalize = text => {
    return text.toUpperCase();
  };

  ifError = () => {
    if (!this.state.model.isValid) {
      return (
        <label className="input-label-error">
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
          className="input input--text"
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
