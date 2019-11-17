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
      <div
        className={
          "mt-3 input-wrapper input-wrapper--transparent "
        }
      >
        <div className="input input--radio-wrapper">
          <span className="input input--radio-group">
            <input
              type={this.state.model.type.toLowerCase()}
              className="input input--radio"
              name={this.state.model.name}
              value="male"
              id="radio-male"
              onChange={this.props.onChange}
              defaultChecked
            ></input>
            <label htmlFor="radio-male">Male</label>
          </span>
          <span className="input input--radio-group">
            <input
              type={this.state.model.type.toLowerCase()}
              className="input input--radio"
              name={this.state.model.name}
              value="female"
              onChange={this.props.onChange}
              id="radio-female"
            ></input>
            <label htmlFor="radio-female">Female</label>
          </span>
        </div>
        <div
          className={
            "input-placeholder input-placeholder--top input-placeholder--center input-placeholder--transparent"
          }
        >
          {this.state.model.placeholder.toUpperCase()}
        </div>
      </div>
    );
  }
}
