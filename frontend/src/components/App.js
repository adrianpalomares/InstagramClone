import React from "react";
import ReactDom from "react-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Upload from "../pages/Upload";
import Register from "../pages/Register";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            // Function used to change user's logged in status
            logUserInOut: function (bool) {
                this.setState({ isLoggedIn: bool });
                console.log(this.state.isLoggedIn);
            },
            userId: 0,
            setUserId: function (id) {
                this.setState({ userId: id });
                console.log("Getting user id ", this.state.userId);
            },
        };
    }

    componentDidMount() {
        // If the access and refresh tokens are in local storage then user is logged in
        if (
            localStorage.getItem("accessToken") &&
            localStorage.getItem("refreshToken")
        ) {
            this.setState({ isLoggedIn: true });
        }
    }

    render() {
        return (
            <Router>
                <Navbar isLoggedIn={this.state.isLoggedIn} />
                <Switch>
                    <Route path="/login">
                        <Login
                            logUserInOut={this.state.logUserInOut.bind(this)}
                            setUserId={this.state.setUserId.bind(this)}
                        />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/logout">
                        <Logout
                            logUserInOut={this.state.logUserInOut.bind(this)}
                        />
                    </Route>
                    <Route path="/upload">
                        <Upload userId={this.state.userId} />
                    </Route>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>
        );
    }
}

ReactDom.render(<App />, document.getElementById("app"));
