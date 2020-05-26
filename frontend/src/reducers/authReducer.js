import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    IS_NOT_LOGIN,
    IS_LOGIN,
    LOGOUT_USER,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
} from "../actions/types";

/*
LOGIN_USER
LOGOUT_USER

*/

const initialState = {
    isLoggedIn: false,
    errorMessage: "",
    isRegistered:false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,

                isLoggedIn: action.payload.isLoggedIn,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                errorMessage: action.payload.errorMessage,
            };
        case IS_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
            };
        case IS_NOT_LOGIN:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegistered: true,
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                errorMessage: action.payload.errorMessage,
            };
        default:
            return state;
    }
}
