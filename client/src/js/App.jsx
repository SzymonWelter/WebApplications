import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SignUp from './signup/signup';
import SignIn from './signin/signin';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/signup">
                    <SignUp/>
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
            </Switch>
        </Router>
    )
}
