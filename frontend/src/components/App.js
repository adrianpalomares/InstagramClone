import React from "react";
import ReactDom from "react-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LogoutPage from "./pages/LogoutPage";
import UploadPage from "./pages/UploadPage";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "../store";
import { Provider } from "react-redux";

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/register">
                            <RegisterPage />
                        </Route>
                        <Route path="/logout">
                            <LogoutPage />
                        </Route>
                        <Route path="/upload">
                            <UploadPage />
                        </Route>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

ReactDom.render(<App />, document.getElementById("app"));
