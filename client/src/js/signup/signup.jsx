import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  InputModel,
  RadioInput,
  TextInput,
  DateInput,
  FileInput,
  ButtonInput,
  Modal,
  inputs
} from "./";

export class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      connection: true,
      loading: false,
      isValid: true,
      inputs: inputs()
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
  }

  activityInputHandler = event => {
    let inputGroup = this.state.inputs;
    let oldIndex = inputGroup.findIndex(x => x.isActive);
    let newIndex = inputGroup.findIndex(x => x.name === event.target.name);

    if (oldIndex !== -1) {
      inputGroup[oldIndex].isActive = false;
    }

    if (event.type === "focus") {
      inputGroup[newIndex].isActive = true;
    }

    this.setState({
      inputs: inputGroup
    });
  };

  onChange = event => {
    event.persist();

    this.setState(prevState => ({
      inputs: prevState.inputs.map(x =>
        x.name === event.target.name
          ? Object.assign(x, {
              value: event.target.value,
              valid: true
            })
          : x
      )
    }));
  };

  onChangeLogin = async event => {
    event.persist();
    this.onChange(event);
    try {
      var response = await fetch(
        "http://localhost:4000/user/login/exists?login=" + event.target.value
      );
      var result = await response.json();
    } catch (error) {
      this.setState({
        connection: false
      });
      return;
    }

    this.setState({
      isValid: !result.exists
    });
  };

  onChangePhoto = event => {
    event.persist();

    let filename = event.target.files[0].name;

    this.setState(prevState => ({
      inputs: prevState.inputs.map(x =>
        x.name === event.target.name
          ? Object.assign(x, {
              value: filename
            })
          : x
      )
    }));

    this.activityInputHandler(event);
  };

  onChangePassword = event => {
    event.persist();

    let password = event.target.value;
    let isValid = true;
    if (password.length < 8) {
      isValid = false;
    }

    this.setState(prevState => ({
      inputs: prevState.inputs.map(x =>
        x.name === event.target.name
          ? Object.assign(x, {
              value: password,
              isValid: isValid
            })
          : x
      )
    }));

    let refPassword = this.state.inputs.filter(
      x => x.name === "confirmPassword"
    )[0].value;

    let refIsValid = true;

    if (password !== refPassword) {
      refIsValid = false;
    }

    this.setState(prevState => ({
      inputs: prevState.inputs.map(x =>
        x.name === "confirmPassword"
          ? Object.assign(x, {
              isValid: refIsValid
            })
          : x
      )
    }));
  };

  onChangeConfirmPassword = event => {
    event.persist();

    let password = event.target.value;
    let isValid = true;
    let refPassword = this.state.inputs.filter(x => x.name === "password")[0]
      .value;
    if (password !== refPassword) {
      isValid = false;
    }

    this.setState(prevState => ({
      inputs: prevState.inputs.map(x =>
        x.name === event.target.name
          ? Object.assign(x, {
              value: password,
              isValid: isValid
            })
          : x
      )
    }));
  };

  onChangePesel = event => {
    event.persist();
    let pesel = event.target.value;
    let isValid = true;
    if (!(pesel.length === 11 && /^\d+$/.test(pesel))) {
      isValid = false;
    }

    this.setState(prevState => ({
      inputs: prevState.inputs.map(x =>
        x.name === event.target.name
          ? Object.assign(x, {
              value: pesel,
              isValid: isValid
            })
          : x
      )
    }));
  };

  async onSubmit(e) {
    e.preventDefault();

    this.setState({
      loading: true
    });

    let form = e.target;
    let data = new FormData();
    data.append("firstName", form.firstName.value);
    data.append("lastName", form.lastName.value);
    data.append("login", form.login.value);
    data.append("password", form.password.value);
    data.append("birthday", form.birthday.value);
    data.append("pesel", form.pesel.value);
    data.append("sex", form.sex.value);
    data.append("photo", form.photo.files[0]);

    const response = await fetch("http://localhost:4000/user", {
      method: "POST",
      body: data
    });
    this.setState({
      logging: false,
      error: !response.ok
    });
  }

  clearForm() {
    document.getElementsByTagName("form")[0].reset();

    this.setState(prevState => ({
      loading: false,
      isValid: true,
      inputs: prevState.inputs.map(x =>
        Object.assign(x, {
          value: ""
        })
      )
    }));
  }

  render() {
    return (
      <section className="sign-up-section">
        <div className="sign-up-wrapper">
          <form className="sign-up-form" onSubmit={this.onSubmit}>
            <header className="sign-up-form__header">Sign up</header>
            <div className="container">
              <div className="row">
                <div className="col col-12 col-md-6">
                  <TextInput
                    model={this.state.inputs[0]}
                    onChange={this.onChange}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12 col-md-6">
                  <TextInput
                    model={this.state.inputs[1]}
                    onChange={this.onChange}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12">
                  <TextInput
                    model={this.state.inputs[2]}
                    onChange={this.onChangeLogin}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12 col-md-6">
                  <TextInput
                    model={this.state.inputs[3]}
                    onChange={this.onChangePassword}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12 col-md-6">
                  <TextInput
                    model={this.state.inputs[4]}
                    onChange={this.onChangeConfirmPassword}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12 col-md-6">
                  <DateInput
                    model={this.state.inputs[5]}
                    onChange={this.onChange}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12 col-md-6">
                  <TextInput
                    model={this.state.inputs[6]}
                    onChange={this.onChangePesel}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12 col-md-6">
                  <RadioInput
                    model={this.state.inputs[7]}
                    onChange={this.onChange}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12 col-md-6">
                  <FileInput
                    model={this.state.inputs[8]}
                    onChange={this.onChangePhoto}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12 col-md-6">
                  <ButtonInput
                    model={this.state.inputs[9]}
                    color="red"
                    onClickHandler={this.clearForm}
                  />
                </div>
                <div className="col col-12 col-md-6">
                  <ButtonInput
                    model={this.state.inputs[10]}
                    color="green"
                    valid={this.state.valid}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
