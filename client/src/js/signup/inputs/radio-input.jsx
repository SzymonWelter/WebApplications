import React, { Component } from "react";
import ReactDOM from "react-dom";
import { InputModel } from "./";

export class RadioInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model
    };
    this.getWrapperClassName = this.getWrapperClassName.bind(this);
    this.getPlaceholderClassName = this.getPlaceholderClassName.bind(this);
  }

  getWrapperClassName() {
    var prefix =
      "mt-3 sign-up-form__input-wrapper sign-up-form__input-wrapper--transparent ";
    var suffix = this.state.model["isActive"]
      ? "sign-up-form__input-wrapper--active"
      : "";
    return prefix + suffix;
  }

  getPlaceholderClassName() {
    var prefix =
      "sign-up-form__input-placeholder sign-up-form__input-placeholder--top ";
    var suffix = this.state.model["isActive"]
      ? "sign-up-form__input-placeholder--active"
      : "sign-up-form__input-placeholder--grey";
    return prefix + suffix;
  }

  capitalize = text => {
    return text.toUpperCase();
  };

  render() {
    return (
      <div className={this.getWrapperClassName()}>
          <div className="p-2">
        <span className="m-4">
          <input
            type={this.state.model.type.toLowerCase()}
            onChange={this.state.model.onChangeHandler}
            onFocus={this.state.model.activityHandler}
            onBlur={this.state.model.activityHandler}
            className="sign-up-form__input sign-up-form__input--radio"
            name={this.state.model.name}
            value="male"
            id="radio-male"
          ></input>
          <label htmlFor="radio-male">Male</label>
        </span>
        <span className="m-2">
          <input
            type={this.state.model.type.toLowerCase()}
            onChange={this.state.model.onChangeHandler}
            onFocus={this.state.model.activityHandler}
            onBlur={this.state.model.activityHandler}
            className="sign-up-form__input sign-up-form__input--radio"
            name={this.state.model.name}
            value="female"
            id="radio-female"
          ></input>
          <label htmlFor="radio-female">Female</label>
        </span>
        </div>
        <div className={this.getPlaceholderClassName()}>
          {this.capitalize(this.state.model.placeholder)}
        </div>
      </div>
    );
  }
}
