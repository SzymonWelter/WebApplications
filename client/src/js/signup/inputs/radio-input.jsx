import React, { Component } from "react";
import ReactDOM from "react-dom";
import { InputModel } from "./";

export class RadioInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model
    };
  }

  render() {
    return (
      <div className={"mt-3 sign-up-form__input-wrapper sign-up-form__input-wrapper--transparent "}>
          <div className="p-2">
        <span className="m-4">
          <input
            type={this.state.model.type.toLowerCase()}
            className="sign-up-form__input sign-up-form__input--radio"
            name={this.state.model.name}
            value="male"
            id="radio-male"
            defaultChecked
          ></input>
          <label htmlFor="radio-male">Male</label>
        </span>
        <span className="m-2">
          <input
            type={this.state.model.type.toLowerCase()}
            className="sign-up-form__input sign-up-form__input--radio"
            name={this.state.model.name}
            value="female"
            id="radio-female"
          ></input>
          <label htmlFor="radio-female">Female</label>
        </span>
        </div>
        <div className={"sign-up-form__input-placeholder sign-up-form__input-placeholder--top "}>
          {this.state.model.placeholder.toUpperCase()}
        </div>
      </div>
    );
  }
}
