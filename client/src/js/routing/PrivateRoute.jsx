import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from 'src/js/services';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
)