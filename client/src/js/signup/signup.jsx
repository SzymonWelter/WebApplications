import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  InputModel,
  RadioInput,
  TextInput,
  DateInput,
  FileInput,
  ButtonInput,
  Modal
} from "./";

export class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      active: undefined,
      logged: false,
      valid: true
    };
    this.getInputs();
    this.onSubmit = this.onSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
  }

  inputGroup = [];
  activityInputHandler = event => {
    var index = this.inputGroup.findIndex(x => x.name == event.target.name);
    if (this.state["active"] !== undefined) {
      this.inputGroup[this.state["active"]].isActive = false;
    }

    if (event.type === "blur") {
      index = undefined;
    } else {
      this.inputGroup[index].isActive = true;
    }

    this.setState(state => {
      return { active: index };
    });
  };

  onChange = event => {
    var index = this.inputGroup.findIndex(x => x.name == event.target.name);
    this.inputGroup[index].value = event.target.value;
  };

  onChangeLogin = async (event) => {
    this.onChange(event);
    var response = await fetch(
      "http://localhost:4000/user/login/exists?login=" + event.target.value
    );
    var result = await response.json();
    this.setState({
      valid: !result.exists
    });
  }

  onChangePhoto = event => {
    var index = this.inputGroup.findIndex(x => x.name == event.target.name);
    var filename = event.target.files[0].name;
    this.inputGroup[index].value = filename;
    this.activityInputHandler(event);
  };

  getInputs() {
    this.inputGroup = [
      new InputModel(
        "firstName",
        "text",
        "first name",
        this.activityInputHandler,
        this.onChange
      ),
      new InputModel(
        "lastName",
        "text",
        "last name",
        this.activityInputHandler,
        this.onChange
      ),
      new InputModel(
        "login",
        "text",
        "login",
        this.activityInputHandler,
        this.onChangeLogin
      ),
      new InputModel(
        "password",
        "password",
        "password",
        this.activityInputHandler,
        this.onChange
      ),
      new InputModel(
        "confirmPassword",
        "password",
        "confirm password",
        this.activityInputHandler,
        this.onChange
      ),
      new InputModel(
        "birthday",
        "date",
        "birthday",
        this.activityInputHandler,
        this.onChange
      ),
      new InputModel(
        "pesel",
        "text",
        "pesel",
        this.activityInputHandler,
        this.onChange
      ),
      new InputModel(
        "sex",
        "radio",
        "sex",
        this.activityInputHandler,
        this.onChange
      ),
      new InputModel(
        "photo",
        "file",
        "photo",
        this.activityInputHandler,
        this.onChangePhoto
      ),
      new InputModel("clear", "button"),
      new InputModel("signup", "submit")
    ];
  }

  async onSubmit(e) {
    e.preventDefault();
    var data = new FormData();
    for (var i of Array.from(e.target)
      .filter(x => x.name != "confirmPassword")
      .slice(0, 7)) {
      data.append(i.name, i.value);
    }
    data.append("sex", "e.target.sex.value");
    data.append("photo", e.target.photo.files[0]);

    const response = await fetch("http://localhost:4000/user", {
      method: "POST",
      body: data
    });
    this.setState({
      logged: response.ok,
      error: !response.ok
    });
  }

  clearForm() {
    console.log("clear");
  }

  getClassName = index => {
    return "col col-12 ".concat(index === 2 ? "" : "col-md-6");
  };

  renderModal() {
    if (this.state.logged) {
      return <Modal close={() => this.setState({ logged: false })} />;
    } else if (this.state.error) {
      return <Modal error />;
    }
  }

  render() {
    return (
      <section className="sign-up-section">
        <div className="sign-up-wrapper">
          <form className="sign-up-form" onSubmit={this.onSubmit}>
            <header className="sign-up-form__header">Sign up</header>
            <div className="container">
              <div className="row">
                {this.inputGroup.map((value, index) => {
                  let input =
                    index == 2 ? (
                      <TextInput model={value} valid={this.state.valid} />
                    ) : (
                      <TextInput model={value} />
                    );
                  switch (value.type) {
                    case "date":
                      input = <DateInput model={value} />;
                      break;
                    case "radio":
                      input = <RadioInput model={value} />;
                      break;
                    case "file":
                      input = <FileInput model={value} />;
                      break;
                    case "submit":
                      input = <ButtonInput model={value} color="green" valid={this.state.valid}/>;
                      break;
                    case "button":
                      input = (
                        <ButtonInput
                          model={value}
                          color="red"
                          onClickHandler={this.clearForm}
                        />
                      );
                      break;
                  }
                  return (
                    <div className={this.getClassName(index)} key={index}>
                      {input}
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
        {this.renderModal()}
      </section>
    );
  }
}
