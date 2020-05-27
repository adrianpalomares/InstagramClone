import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, isUserLoggedIn } from "../../actions/authActions";
import { Redirect } from "react-router-dom";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.username, this.state.password);
        // Initiate action
        this.props.loginUser(this.state.username, this.state.password);
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
                            name="username"
                            placeholder="Enter username"
                            value={this.state.username}
                            onChange={this.onChange}
                            required
                        />
                    </div>
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
        if (this.props.isLoggedIn) {
            return <Redirect from="/login" to="/" />;
        } else {
            return this.renderContent();
        }
    }
}

LoginPage.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isUserLoggedIn: PropTypes.func.isRequired,
    auth: PropTypes.object,
    isLoggedIn: PropTypes.bool.isRequired
    
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, { loginUser, isUserLoggedIn })(
    LoginPage
);
