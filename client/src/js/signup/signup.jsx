import React, { Component } from "react";
import ReactDOM from "react-dom";
import { InputModel, RadioInput, TextInput, DateInput, FileInput, ButtonInput } from "./";

export class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      active: undefined
    };
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
        this.onChange
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
      new InputModel(
        "clear",
        "button"
      ),
      new InputModel(
        "signup",
        "submit"
      )
    ];
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

  onChangePhoto = event => {
    var index = this.inputGroup.findIndex(x => x.name == event.target.name);
    var filename = event.target.files[0].name;
    this.inputGroup[index].value = filename;
    this.activityInputHandler(event);
  };

  getClassName = index => {
    return "col col-12 ".concat(index === 2 ? "" : "col-md-6");
  };

  render() {
    return (
      <section className="sign-up-section">
        <div className="sign-up-wrapper">
          <form className="sign-up-form">
            <header className="sign-up-form__header">Sign up</header>
            <div className="container">
              <div className="row">
                {this.inputGroup.map((value, index) => {
                  let input = <TextInput model={value} />;
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
                        input = <ButtonInput model={value} color="green"/>
                        break;
                    case "button":
                      input = <ButtonInput model={value} color="red"/>
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
      </section>
    );
  }
}
