import React from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
    componentDidMount() {
        this.props.logUserInOut(false);
    }
    render() {
        return <Redirect from="/logout" to="/" />
    }
}

export default Logout;