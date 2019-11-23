import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { handleResponse } from 'src/js/helpers';
import { cookieService } from './'

const currentUserSubject = new BehaviorSubject(cookieService.getCookie('currentUser'));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(login, password) {

    const data = new FormData();
    data.append("login", login);
    data.append("password", password);

    const requestOptions = {
        method: 'POST',
        body: data
    };

    return fetch(`${config.apiUrl}/user/authenticate`, requestOptions)
        .then(handleResponse)
        .then(result => {
            cookieService.setCookie('currentUser', JSON.stringify(result));
            currentUserSubject.next(result);

            return result;
        });
}

function logout() {
    cookieService.removeCookie('currentUser');
    currentUserSubject.next(null);
}