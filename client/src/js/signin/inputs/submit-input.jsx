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
        class="sign-up-form__input sign-up-form__input--submit"
        value="Log in"
      />
    );
  }
}

