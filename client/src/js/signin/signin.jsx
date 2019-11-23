import React, { Component } from "react";
import { TextInput, ButtonInput, SignInInputs } from "src/js/inputs";
import { Link } from "react-router-dom";
import { authenticationService } from "src/js/services";

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
    this.state = {
      loading: false,
      isValid: true,
      error: "",
      models: SignInInputs()
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(event) {
    const login = event.target.login;
    const password = event.target.password;
    authenticationService.login(login, password).then(
      user => {
        const { prevLocation } = this.props.location.state || {
          prevState: { pathname: "/" }
        };
        this.props.history.push(prevLocation);
      },
      error => {
        console.log(error);
      }
    );
  }

  activityInputHandler = event => {
    event.persist();
    this.setState(prevState => ({
      models: prevState.models.map(x =>
        Object.assign(x, {
          isActive: x.name === event.target.name && event.type === "focus"
        })
      )
    }));
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
