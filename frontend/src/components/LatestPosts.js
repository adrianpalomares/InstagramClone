import React from "react";

class LatestPosts extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ listOfPosts: this.props.listOfPosts });
    }

    renderPosts() {
        return (
            <React.Fragment>
                {this.props.listOfPosts.map((postObject, index) => {
                    return (
                        <div key={index} className="card col-4 mt-4 w-75">
                            <img
                                className="card-img-top"
                                src={postObject.img}
                                alt="Card image cap"
                            />
                            <div className="card-body">
                                {/* <h5 class="card-title">Card title</h5> */}
                                <p className="card-text">
                                    {postObject.caption}
                                </p>
                                <a href="#" className="btn btn-primary">
                                    View Post
                                </a>
                            </div>
                        </div>
                    );
                })}
            </React.Fragment>
        );
    }

    render() {
        if (this.props.listOfPosts != null) {
            return this.renderPosts();
        } else {
            return <div>No Posts!</div>;
        }
    }
}

export default LatestPosts;
