import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emailAddress: "",
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            redirect: false,
        };

        // Bind functions
        this.handleEmailAddressChange = this.handleEmailAddressChange.bind(
            this
        );
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Functions to update state as user types
    handleEmailAddressChange(event) {
        this.setState({ emailAddress: event.target.value });
    }

    handleFirstNameChange(event) {
        this.setState({ firstName: event.target.value });
    }

    handleLastNameChange(event) {
        this.setState({ lastName: event.target.value });
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        // Function used to get CSRF Token from browser's cookies
        // Credit to https://www.tutorialrepublic.com/javascript-tutorial/javascript-cookies.php
        function getCookie(name) {
            // Split cookie string and get all individual name=value pairs in an array
            var cookieArr = document.cookie.split(";");

            // Loop through the array elements
            for (var i = 0; i < cookieArr.length; i++) {
                var cookiePair = cookieArr[i].split("=");

                /* Removing whitespace at the beginning of the cookie name
                and compare it with the given string */
                if (name == cookiePair[0].trim()) {
                    // Decode the cookie value and return
                    return decodeURIComponent(cookiePair[1]);
                }
            }

            // Return null if not found
            return null;
        }

        const csrfToken = getCookie("csrftoken");

        axios({
            method: "POST",
            url: "/api/register/",
            headers: {
                "X-CSRFTOKEN": csrfToken,
            },
            data: {
                email: this.state.emailAddress,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                username: this.state.username,
                password: this.state.password,
            },
        })
            .then((response) => {
                console.log(response);
                // Update the state in order to initiate a Redirect
                if (response.status == 201) {
                    this.setState({ redirect: true });
                }
            })
            .catch((error) => {
                console.log(Object.entries(error));
                const errorText = JSON.parse(error.request.responseText);
                console.log(Object.values(errorText)[0][0])
                
                // console.log(JSON.parse(error.request.responseText));
            });

        event.preventDefault();
    }

    // Render content method to keep React's render() a little cleaner
    renderContent() {
        return (
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* Email Input */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email address"
                            value={this.state.emailAddress}
                            onChange={this.handleEmailAddressChange}
                            required
                        />
                    </div>
                    {/* First name input */}
                    <div className="form-group">
                        <label htmlFor="firstName">Firstname</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="Enter first name"
                            value={this.state.firstName}
                            onChange={this.handleFirstNameChange}
                            required
                        />
                    </div>
                    {/* Last name input */}
                    <div className="form-group">
                        <label htmlFor="lastName">Lastname</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Enter last name"
                            value={this.state.lastName}
                            onChange={this.handleLastNameChange}
                            required
                        />
                    </div>
                    {/* User name input */}
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
                    {/* Password input */}
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
                </form>
            </div>
        );
    }

    render() {
        if (this.state.redirect) {
            return <Redirect from="/register" to="/login" />;
        } else {
            return this.renderContent();
        }
    }
}

export default Register;
