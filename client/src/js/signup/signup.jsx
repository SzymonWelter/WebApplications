import config from "config";
import { Modal } from "./modal";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import {
  RadioInput,
  TextInput,
  DateInput,
  FileInput,
  ButtonInput,
  SignUpInputs
} from "src/js/inputs";
import { authenticationService } from "src/js/services";

export class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isValid: false,
      inputs: SignUpInputs(),
      success: false,
      modal: false,
      loading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.dataIsValid = this.dataIsValid.bind(this);
  }

  activityInputHandler = event => {
    event.persist();
    this.setState(prevState => ({
      models: prevState.inputs.map(x =>
        Object.assign(x, {
          isActive: x.name === event.target.name && event.type === "focus"
        })
      )
    }));
  };

  onChange = event => {
    event.persist();
    this.setState(prevState => ({
      inputs: prevState.inputs.map(x =>
        x.name === event.target.name
          ? Object.assign(x, {
              value: event.target.value,
              isValid: true
            })
          : x
      )
    }));
  };

  onChangeLogin = async event => {
    event.persist();
    this.onChange(event);

    var response = await fetch(
      `${config.apiUrl}/user/login/exists?login=${event.target.value}`
    );
    var result = await response.json();
    this.setState(prevState => ({
      inputs: prevState.inputs.map(x =>
        x.name === event.target.name
          ? Object.assign(x, {
              isValid: !result.exists,
              value: event.target.value
            })
          : x
      )
    }));
  };

  onChangePhoto = event => {
    event.persist();

    let filename = event.target.files[0].name;
    let isValid = this.checkExtension(filename);

    this.setState(prevState => ({
      inputs: prevState.inputs.map(x =>
        x.name === event.target.name && isValid
          ? Object.assign(x, {
              value: filename,
              isValid: isValid
            })
          : x
      )
    }));

    this.activityInputHandler(event);
  };

  checkExtension = filename => {
    return /\.(webp|jpe?g|tiff|png)$/i.test(filename);
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

  onChangeDate = event => {
    event.persist();
    let date = new Date(event.target.value);
    let validationResult = this.validDate(date);

    this.setState(prevState => ({
      inputs: prevState.inputs.map(x =>
        x.name === event.target.name
          ? Object.assign(x, {
              value: date,
              isValid: validationResult.isValid,
              errorMessage: validationResult.errorMessage
            })
          : x
      )
    }));
  };

  validDate = date => {
    let isValid = true;
    let errorMessage = "";
    if (date > new Date().setFullYear(new Date().getFullYear() - 13)) {
      errorMessage = "You must be older than 13 years old";
      isValid = false;
    }
    if (
      date < new Date().setFullYear(new Date().getFullYear() - 120) ||
      date > new Date()
    ) {
      errorMessage = "Date is wrong";
      isValid = false;
    }
    return { isValid: isValid, errorMessage: errorMessage };
  };

  async onSubmit(e) {
    e.preventDefault();
    let isValid = this.dataIsValid();
    this.setState({
      isValid: isValid
    });

    if (!isValid) {
      return;
    }

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

    var response = await fetch(`${config.apiUrl}/user/signup`, {
      method: "POST",
      body: data
    });

    this.setState(prevState => ({
      loading: false
    }));

    if (response.status !== 200) {
      this.state.modal = true;
      return;
    }
    this.clearForm();
    this.props.history.push("/signin");
  }

  clearForm() {
    document.getElementsByTagName("form")[0].reset();

    this.setState(prevState => ({
      loading: false,
      isValid: true,
      inputs: prevState.inputs.map(x =>
        Object.assign(x, {
          value: "",
          isValid: true
        })
      )
    }));
  }

  dataIsValid() {
    let inputs = this.state.inputs;
    let isValid = true;
    for (let i of inputs) {
      if (i.value.length === 0) {
        isValid = false;
        this.setState(prevState => ({
          inputs: prevState.inputs.map(x =>
            x.name === i.name
              ? Object.assign(x, {
                  isValid: false
                })
              : x
          )
        }));
      }
      if (!i.isValid) {
        isValid = false;
      }
    }
    return isValid;
  }

  showModal = () => {
    if (this.state.modal) return <Modal close={this.closeModal} />;
  };

  closeModal = () => {
    this.setState({
      modal: false
    });
  };

  responseFacebook = response => {
    authenticationService.fbSignUp(response).then(_ => {
      this.props.history.push("/signin");
    });
  };

  render() {
    return (
      <section className="sign-up-section">
        <div className="sign-up-wrapper">
          <form className="sign-up-form" onSubmit={this.onSubmit}>
            <header className="sign-up-form__header">Sign up</header>
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="center-child">
                    <FacebookLogin
                      appId={config.appId}
                      fields="name,email,picture"
                      callback={this.responseFacebook}
                      textButton="Register with facebook"
                      cssClass="fb-button"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col col-12 col-lg-6">
                  <TextInput
                    model={this.state.inputs[0]}
                    onChange={this.onChange}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12 col-lg-6">
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
                <div className="col col-12 col-lg-6">
                  <TextInput
                    model={this.state.inputs[3]}
                    onChange={this.onChangePassword}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12 col-lg-6">
                  <TextInput
                    model={this.state.inputs[4]}
                    onChange={this.onChangeConfirmPassword}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12 col-lg-6">
                  <DateInput
                    model={this.state.inputs[5]}
                    onChange={this.onChangeDate}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12 col-lg-6">
                  <TextInput
                    model={this.state.inputs[6]}
                    onChange={this.onChangePesel}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-12 col-lg-6">
                  <RadioInput
                    model={this.state.inputs[7]}
                    onChange={this.onChange}
                  />
                </div>
                <div className="col col-12 col-lg-6">
                  <FileInput
                    model={this.state.inputs[8]}
                    onChange={this.onChangePhoto}
                    onActivity={this.activityInputHandler}
                  />
                </div>
                <div className="col col-6">
                  <ButtonInput
                    name="clear"
                    type="button"
                    color="red"
                    onClick={this.clearForm}
                  />
                </div>
                <div className="col col-6 col-6">
                  <ButtonInput
                    name="sign up"
                    type="submit"
                    color="green"
                    isValid={this.state.isValid}
                    loading={this.state.loading}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col col-12">
                  <div className="center-child">
                    <Link to={"/signin"}>Sign in</Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {this.showModal()}
      </section>
    );
  }
}
