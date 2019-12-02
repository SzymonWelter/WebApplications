import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { SignUp } from "./signup/signup";
import { SignIn } from "./signin/signin";
import { history } from "src/js/helpers";
import { PrivateRoute } from "src/js/routing/PrivateRoute";
import { Home }from "src/js/home"
import { authenticationService } from  'src/js/services'
import { MainNavbar } from "./navbar";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x =>
      this.setState({ currentUser: x })
    );
  }

  logout() {
    authenticationService.logout();
    history.push("/signin");
  }

  render() {
    return (
      <Router history={history}>
        {this.state.currentUser && <MainNavbar/>}
        <Switch>
          <PrivateRoute exact path="/" component={Home}></PrivateRoute>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    );
  }
}
