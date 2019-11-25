import React, { Component } from "react";

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
  };

  isEmpty = () => {
    return this.state.value === undefined || this.state.value.length === 0;
  };

  render() {
    return (
      <div className="mt-3 input-wrapper input-wrapper--transparent">
        <input
          type="file"
          onChange={this.props.onChange}
          className="input input--file"
          name={this.state.model.name}
          accept="image/*"
        />
        <div className="input--file-wrapper">
          <label>Choose file</label>
          <div className="input--file-label">
            { this.state.model.value }
          </div>
        </div>
        <div className="input-placeholder input-placeholder--top input-placeholder--grey">
          {this.capitalize(this.state.model.placeholder)}
        </div>
        {this.ifError()}
      </div>
    );
  }
}
