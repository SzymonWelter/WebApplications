import React, { Component } from "react";
import { authenticationService } from "src/js/services";

export class MainNavbar extends Component {
  constructor(props) {
    super(props);
  }

  logout = e => {
    authenticationService.logout();
    location.reload(true);
  };

  render() {
    return (
      <nav className="main-navbar">
        <ul className="main-navbar__list">
            <li className="main-navbar__item"></li>
            <li className="main-navbar__item"></li>
        </ul>
        <button onClick={this.logout} className="main-navbar__button main-navbar__button--red">Sign out</button>
      </nav>
    );
  }
}
