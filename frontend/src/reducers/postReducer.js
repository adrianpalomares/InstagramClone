import {
    FETCH_LATEST_POSTS,
    UPLOAD_POST,
    UPLOAD_SUCCESS,
    UPLOAD_FAILURE,
} from "../actions/types";

const initialState = {
    items: [],
    uploadStatus: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_LATEST_POSTS:
            return {
                ...state,
                items: action.payload,
            };
        case UPLOAD_SUCCESS:
            // Adding the new post as well as returning a statusCode
            return {
                ...state,
                uploadStatus: action.payload.uploadStatus,
                items: items.concat(action.payload.newPost),
            };
        case UPLOAD_FAILURE:
            return {
                ...state,
                uploadStatus: false,
            };
        default:
            return state;
    }
}
