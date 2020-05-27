import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

class LogoutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.logoutUser();
    }

    render() {
        return <Redirect from="/logout" to="/" />;
    }
}

const mapStateToProps = (state) => ({
    logoutUser: state.auth.logoutUser,
});

export default connect(mapStateToProps, { logoutUser })(LogoutPage);
