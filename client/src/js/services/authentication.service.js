import { BehaviorSubject } from "rxjs";

import config from "config";
import { handleResponse } from "src/js/helpers";
import { cookieService } from "./";
import {requestService} from'./request.service';

const currentUserSubject = new BehaviorSubject(
  cookieService.getCookie("currentUser")
);

export const authenticationService = {
  login,
  logout,
  fbSignUp,
  renewToken,
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
    .then(result => result.json())
    .then(result => {
      if (!result.isSuccess) {
        throw new Error(result.message);
      }
      const expirationDate = getExpirationDate(5);
      cookieService.setCookie(
        "currentUser",
        result.token,
        expirationDate
      );
      currentUserSubject.next(result.token);
      return result;
    });
}

function renewToken(token){
  const expirationDate = getExpirationDate(5);
  cookieService.setCookie(
    "currentUser",
    token,
    expirationDate
  );
  currentUserSubject.next(token);
}

async function fbSignUp(fbResponse){
  const names = fbResponse.name.trim().split(' ');
  const sex = names[0].slice(-1) === 'a' ? 'Female' : 'Male';
  const body = new FormData();
   body.append('firstName', names[0]);
   body.append('lastName', names[1]);
   body.append('email', fbResponse.email);
   body.append('photoUrl', fbResponse.picture.data.url);
   body.append('sex', sex);
   body.append('accessToken', fbResponse.accessToken);

  try {
    return requestService.post(`${config.apiUrl}/user/signup/facebook`, body);
  }
  catch (error) {
    console.log(error);
  }
}

function getExpirationDate(minutes){
  return new Date(new Date().getTime() + 1000 * 60 * minutes);
}

function logout() {
  cookieService.removeCookie("currentUser");
  currentUserSubject.next(null);
}
