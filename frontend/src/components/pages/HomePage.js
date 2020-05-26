import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchLatestPosts } from "../../actions/postActions";

class HomePage extends React.Component {
    componentDidMount() {
        if (this.props.fetchLatestPosts) {
            this.props.fetchLatestPosts();
        }
    }

    render() {
        let postsContent = "";
        if (this.props.posts) {
            postsContent = this.props.posts.map((postObject, index) => (
                <div key={index} className="card col-4 mt-4 w-75">
                    <img
                        className="card-img-top"
                        src={postObject.img}
                        alt="Card image cap"
                    />
                    <div className="card-body">
                        {/* <h5 class="card-title">Card title</h5> */}
                        <p className="card-text">{postObject.caption}</p>
                        <a href="#" className="btn btn-primary">
                            View Post
                        </a>
                    </div>
                </div>
            ));
        }
        // TODO: Add a better loading screen
        return (
            <div className="container">
                <h1>Latest Posts</h1>
                <div className="row">
                    {this.props.posts ? postsContent : ""}
                </div>
            </div>
        );
    }
}

// Setting Prop Types
HomePage.propTypes = {
    fetchLatestPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
};

// Mapping state to Props
const mapStateToProps = (state) => ({
    posts: state.posts.items,
});

export default connect(mapStateToProps, { fetchLatestPosts })(HomePage);
