import {
    FETCH_LATEST_POSTS,
    UPLOAD_POST,
    UPLOAD_SUCCESS,
    UPLOAD_FAILURE,
} from "./types";
import Axios from "axios";

// Grab the lates posts for HomePage
export function fetchLatestPosts() {
    // NOTE: with limit=6 it returns an object not an array

    return function (dispatch) {
        Axios("/api/posts/latest").then((posts) =>
            dispatch({ type: FETCH_LATEST_POSTS, payload: posts.data })
        );
    };
}

export function uploadPost(userId, file, caption) {
    return function (dispatch) {
        Axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        Axios.defaults.xsrfCookieName = "csrftoken";
        console.log(userId, file, caption);

        const formData = new FormData();
        formData.append("user", userId);
        formData.append("img", file, file.name);
        formData.append("caption", caption);

        // Send file to /posts
        Axios.post("/api/posts/", formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        })
            .then((response) => {
                console.log(response.data);
                // Dispatch
                dispatch({
                    type: UPLOAD_SUCCESS,
                    payload: { uploadStatus: 201, newPost: response.data },
                });
            })
            .catch((error) => {
                console.log(JSON.parse(error));
                dispatch({
                    type: UPLOAD_FAILURE,
                    payload: { uploadStatus: false },
                });
            });
    };
}
