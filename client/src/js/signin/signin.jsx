import React, { Component } from "react";
import { TextInput, ButtonInput, SignInInputs } from "src/js/inputs";
import {Link} from 'react-router-dom'

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isValid: true,
      error: "",
      models: SignInInputs()
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit() {}

  activityInputHandler = event => {
    let inputGroup = this.state.models;
    let oldIndex = inputGroup.findIndex(x => x.isActive);
    let newIndex = inputGroup.findIndex(x => x.name === event.target.name);

    if (oldIndex !== -1) {
      inputGroup[oldIndex].isActive = false;
    }

    if (event.type === "focus") {
      inputGroup[newIndex].isActive = true;
    }

    this.setState({
      models: inputGroup
    });
  };

  onChange = event => {
    event.persist();
    this.setState(prevState => ({
      models: prevState.models.map(x =>
        x.name === event.target.name
          ? Object.assign(x, {
              value: event.target.value,
              isValid: true
            })
          : x
      )
    }));
  };

  render() {
    return (
      <section className="signin-section">
        <div className="signin-wrapper">
          <form className="signin-form" onSubmit={this.onSubmit}>
            <header className="signin-form__header">Sign in</header>
            <div className="container">
              <div className="row">
                <div className="col">
                  <TextInput
                    model={this.state.models[0]}
                    onChange={this.onChange}
                    onActivity={this.activityInputHandler}
                  ></TextInput>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <TextInput
                    model={this.state.models[1]}
                    onChange={this.onChange}
                    onActivity={this.activityInputHandler}
                  ></TextInput>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input type="checkbox" />
                  <label>Remember me</label>
                </div>
                <div className="col">
                  <ButtonInput name="Sign in" color="green"></ButtonInput>
                </div>
              </div>
              <div className="row">
                <div className="col">
                    <Link to={"/signup"}>Sign up</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
