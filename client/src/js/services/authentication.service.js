import { BehaviorSubject } from "rxjs";
import * as moment from "moment";

import config from "config";
import { handleResponse } from "src/js/helpers";
import { cookieService } from "./";

const currentUserSubject = new BehaviorSubject(
  cookieService.getCookie("currentUser")
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

function login(login, password) {
  const data = new FormData();
  data.append("login", login);
  data.append("password", password);

  const requestOptions = {
    method: "POST",
    body: data
  };

  return fetch(`${config.apiUrl}/user/authenticate`, requestOptions)
    .then(handleResponse)
    .then(result => {
      if (!result.isSuccess) {
        throw new Error(result.message);
      }
      const expirationDate = moment()
        .add(5, "minutes")
        .utc()
        .format("YYYY-MM-DDThh:mm:ss");
      cookieService.setCookie(
        "currentUser",
        result.token,
        new Date(expirationDate)
      );
      currentUserSubject.next(result.token);
      return result;
    });
}

function logout() {
  cookieService.removeCookie("currentUser");
  currentUserSubject.next(null);
}
