import React, { Component } from "react";
import { TextInput, ButtonInput, SignInInputs } from "src/js/inputs";
import { Error } from "./";
import { Link } from "react-router-dom";
import { authenticationService } from "src/js/services";

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }

    this.state = this.baseState();
    this.form = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }

  baseState = () => ({
    loading: false,
    isValid: true,
    error: "",
    models: SignInInputs()
  });

  async onSubmit(event) {
    event.preventDefault();
    const login = event.target.login.value;
    const password = event.target.password.value;
    authenticationService.login(login, password).then(
      result => {
        const { from } = this.props.location.state || {
          from: { pathname: "/" }
        };
        this.reset();
        this.props.history.push(from);
      },
      error => {
        this.setState({ error: error.message });
      }
    );
  }

  reset = () => {
    this.form.current.reset();
    this.setState(this.baseState());
  };

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
          <form
            className="signin-form"
            onSubmit={this.onSubmit}
            ref={this.form}
          >
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
                  <div className="center-child">
                    <Link to={"/signup"}>Sign up</Link>
                  </div>
                </div>
                <div className="col">
                  <ButtonInput
                    name="Sign in"
                    color="green"
                    type="submit"
                  ></ButtonInput>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Error message={this.state.error}></Error>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
