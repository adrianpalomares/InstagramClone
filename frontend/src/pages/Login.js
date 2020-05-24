import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            errorMessage: "",
            redirect: false,
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        axios({
            method: "POST",
            url: "api/token/",
            data: {
                username: this.state.username,
                password: this.state.password,
            },
        })
            .then((response) => {
                console.log(response);
                // Clear error message
                this.setState({ errorMessage: "" });

                // Add the access token and refresh token to localStorage
                const accessToken = response.data.access;
                const refreshToken = response.data.refresh;

                // Add tokens to user storage for later use
                window.localStorage.setItem("accessToken", accessToken);
                window.localStorage.setItem("refreshToken", refreshToken);

                // Grab User ID from token
                const tokens = accessToken.split(".");
                const tokenPayload = tokens[1];
                const tokenPayloadDecoded = atob(tokenPayload);
                const tokenPayloadObject = JSON.parse(tokenPayloadDecoded);

                // Add user id to App.js state
                this.props.setUserId(tokenPayloadObject.user_id);
                window.localStorage.setItem(
                    "user_id",
                    tokenPayloadObject.user_id
                );

                // Set app logged in state to true
                // State from App.js
                this.props.logUserInOut(true);

                // Initiate redirect
                this.setState({ redirect: true });
            })
            // When username/password is incorrect
            .catch((err) => {
                // Clear password field
                this.setState({
                    password: "",
                    errorMessage: "Username/Password is wrong.",
                });

                console.log(err);
            });

        event.preventDefault();
    }

    renderContent() {
        return (
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    {/* Print an error message if there is an error logging in */}
                    {this.state.errorMessage ? (
                        <p>{this.state.errorMessage}</p>
                    ) : (
                        ""
                    )}
                </form>
            </div>
        );
    }

    render() {
        if (this.state.redirect) {
            return <Redirect from="/login" to="/" />;
        } else {
            return this.renderContent();
        }
    }
}

export default Login;
