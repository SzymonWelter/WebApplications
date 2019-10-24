import React, { Component } from "react";
import ReactDOM from "react-dom";

export class SubmitInput extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <input
        type="submit"
        class="log-in-form__input log-in-form__input--submit"
        value="Log in"
      />
    );
  }
}

