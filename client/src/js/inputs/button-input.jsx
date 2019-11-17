import React, { Component } from "react";
import ReactDOM from "react-dom";
import { InputModel } from "./";

export class ButtonInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: props.isValid,
      loading: props.loading
    };
  }

  getClassName = () => {
    return "input input--button input--button-" +
    this.props.color +
    (this.state.isValid || !this.state.loading
      ? ""
      : " input input--button-disabled")
  }

  capitalize = text => {
    return text.toUpperCase();
  };

  spinner = () => {
    if (this.state.loading)
      return (
        <div className="spinner-grow text-secondary" role="status">
          <span className="sr-only">Signing up</span>
        </div>
      );
  };

  render() {
    return (
      <div className="input--button-wrapper">
        <button
          type={this.props.type}
          className={this.getClassName()}
          name={this.props.name}
        >
          {this.props.name.toUpperCase()}
        </button>
        {this.spinner()}
      </div>
    );
  }
}