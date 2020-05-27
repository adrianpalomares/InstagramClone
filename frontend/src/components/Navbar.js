import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { isUserLoggedIn, isLoggedIn } from "../actions/authActions";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // This function updates isLoggedIn boolean
        this.props.isUserLoggedIn();
    }
    renderContent() {
        if (this.props.isLoggedIn) {
            return (
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>

                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/profile">
                            Profile
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/upload">
                            Upload
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout">
                            Log Out
                        </Link>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/register">
                            Register
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            );
        }
    }

    render() {
        return this.renderContent();
    }
}

const mapStateToProps = (state) => ({
    isUserLoggedIn: state.auth.isUserLoggedIn,
    isLoggedIn: state.auth.isLoggedIn,
});
export default connect(mapStateToProps, { isUserLoggedIn })(Navbar);
