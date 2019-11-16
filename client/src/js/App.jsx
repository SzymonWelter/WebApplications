import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SignUp from './signup/signup';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/signup">
                    <SignUp/>
                </Route>
            </Switch>
        </Router>
    )
}
