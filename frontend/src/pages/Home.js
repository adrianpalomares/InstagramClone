import React from "react";
import axios from "axios";
import LatestPosts from "../components/LatestPosts";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { listOfPosts: [] };
    }

    componentDidMount() {
        // Get the latest posts
        axios({
            method: "GET",
            url: "/api/posts/latest?limit=6",
        })
            .then((response) => {
                this.setState({ listOfPosts: response.data.results });
                console.log(this.state.listOfPosts);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    renderContent() {
        return (
            <React.Fragment>
                <div className="container mb-4">
                    <h1>Latest Posts</h1>
                    <div className="row">
                        {/* Posts go here */}
                        <LatestPosts listOfPosts={this.state.listOfPosts} />
                    </div>
                </div>
            </React.Fragment>
        );
    }

    render() {
      if (this.state.listOfPosts == null) {
          return <div>Loading</div>
      } else {
          return this.renderContent();
      }
    }
}

export default Home;
