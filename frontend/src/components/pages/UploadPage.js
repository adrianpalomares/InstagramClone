import React from "react";
import { connect } from "react-redux";
import { uploadPost } from "../../actions/postActions";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

class UploadPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            caption: "",
            userId: "",
            hasBeenSubmitted: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }
    componentDidMount() {
        this.setState({ userId: window.localStorage.getItem("userId") });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onFileChange(event) {
        this.setState({ file: event.target.files[0] });
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.uploadPost(
            this.state.userId,
            this.state.file,
            this.state.caption
        );

        // Change to hasBeenSubmitted
        this.setState({ hasBeenSubmitted: true });
    }

    // TODO: Redirect if user is not logged in
    // Using auth
    render() {
        if (!this.state.hasBeenSubmitted) {
            return (
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <h1>Upload Post</h1>
                        <input
                            className="form-control-file"
                            id="fileInput"
                            type="file"
                            onChange={this.onFileChange}
                        />

                        <div className="form-group">
                            Caption
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.caption}
                                name="caption"
                                onChange={this.onChange}
                            />
                        </div>
                        <button className="btn btn-primary" type="submit">
                            Upload
                        </button>
                    </form>
                </div>
            );
        } else {
            // TODO: Add conditional to this part
            return <Redirect from="/upload" to="/" />;
        }
    }
}

UploadPage.propTypes = {
    uploadPost: PropTypes.func.isRequired,
    uploadStatus: PropTypes.number,
};

const mapStateToProps = (state) => ({
    uploadStatus: state.posts.uploadStatus,
});

export default connect(mapStateToProps, { uploadPost })(UploadPage);
