import React from "react";
import axios, { post } from "axios";

class Upload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            caption: "",
            userId: parseInt(window.localStorage.getItem("user_id")),
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleCaptionChange = this.handleCaptionChange.bind(this);
    }

    handleFileChange(event) {
        this.setState({ file: event.target.files[0] });
    }

    handleCaptionChange(event) {
        this.setState({ caption: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();

        // Telling axios where to find the CSRF cookie
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        
        // Form data to submit => user, caption, img
        let formData = new FormData();
        formData.append("user", this.state.userId);
        formData.append("caption", this.state.caption);
        formData.append("img", this.state.file, this.state.file.name);
        axios
            .post("/api/posts/", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h1>Upload Post</h1>
                    <div className="form-group">
                        <label htmlFor="fileInput">Select Image</label>
                        <input
                            className="form-control-file"
                            id="fileInput"
                            type="file"
                            onChange={this.handleFileChange}
                        />
                    </div>
                    <div className="form-group">
                        Caption
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.caption}
                            onChange={this.handleCaptionChange}
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">Upload</button>
                </form>
            </div>
        );
    }
}

export default Upload;
