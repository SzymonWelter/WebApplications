import React, { Component } from "react";
import ReactDOM from "react-dom";

export class CheckboxInput extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="log-in-form__checkbox-group">
        <label htmlFor="remindMe">
          Remember me
          <input
            type="checkbox"
            id="remindMe"
            className="log-in-form__input--checkbox"
          />
        </label>
      </div>
    );
  }
}
export default CheckboxInput;