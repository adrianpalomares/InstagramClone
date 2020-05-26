import React from "react";
import { registerUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// TODO: Fix the redirect


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            hasSubmitted: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({ hasSubmitted: true });
        console.log(this.state);
        this.props.registerUser(
            this.state.email,
            this.state.firstname,
            this.state.lastname,
            this.state.username,
            this.state.password
        );
    }


    /*
    * @param {string} errorMessage - The error message to display; default = ""
    */
    renderContent(errorMessage = "") {
        return (
            <div className="container">
                <h1 className="mb-4">Register</h1>
                <form onSubmit={this.onSubmit}>
                    {/* Email Input */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email address"
                            value={this.state.emailAddress}
                            onChange={this.onChange}
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
                            name="firstname"
                            placeholder="Enter first name"
                            value={this.state.firstName}
                            onChange={this.onChange}
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
                            name="lastname"
                            placeholder="Enter last name"
                            value={this.state.lastName}
                            onChange={this.onChange}
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
                            name="username"
                            placeholder="Enter username"
                            value={this.state.username}
                            onChange={this.onChange}
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
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <p className="mt-4"style={{ color: "red" }}>{errorMessage}</p>
                </form>
            </div>
        );
    }

    render() {
        // If form has been submitted
        if (this.state.hasSubmitted) {
            if (this.props.isRegistered) {
                return <Redirect from="/register" to="/" />;
            } else {
                return this.renderContent(this.props.errorMessage);
            }
        }
        return this.renderContent();
    }
}

RegisterPage.propTypes = {
    registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps, { registerUser })(RegisterPage);
