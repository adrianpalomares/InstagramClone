import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    IS_LOGIN,
    IS_NOT_LOGIN,
    LOGOUT_USER,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
} from "./types";
import Axios from "axios";

// TODO: Stop storing access tokens in state they are
// being stored in localStorage

export function loginUser(username, password) {
    return function (dispatch) {
        // Send request to /api/auth
        Axios.defaults.xsrfCookieName = "csrftoken";
        Axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        Axios({
            method: "POST",
            url: "http://localhost:8000/api/token/",
            data: {
                username: username,
                password: password,
            },
        })
            .then((response) => {
                // Add token and refresh token to localStorage
                window.localStorage.setItem(
                    "accessToken",
                    response.data.access
                );
                window.localStorage.setItem(
                    "refreshToken",
                    response.data.refresh
                );
                console.log(response.data);
                window.localStorage.setItem("userId", response.data.userId);

                // response.data => {access:"", refresh:""}
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        isLoggedIn: true,
                    },
                });
            })
            .catch((error) => {
                // TODO: Add a dispatch() here
                // Add an errorMessage
                console.log(
                    "Error occured in loginUser() authActions.js: ",
                    error
                );
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: {
                        errorMessage: "Username or Password is wrong",
                    },
                });
            });
    };
}

export function logoutUser() {
    return function (dispatch) {
        // Clearing access and refresh tokens from local storage
        // Will cause isUserLoggedIn() to fail
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
        dispatch({
            type: LOGOUT_USER,
        });
    };
}

export function isUserLoggedIn() {
    return function (dispatch) {
        if (
            window.localStorage.getItem("accessToken") &&
            window.localStorage.getItem("refreshToken")
        ) {
            dispatch({
                type: IS_LOGIN,
            });
        } else {
            dispatch({
                type: IS_NOT_LOGIN,
            });
        }
    };
}

export function registerUser(email, firstname, lastname, username, password) {
    return function (dispatch) {
        Axios.defaults.xsrfCookieName = "csrftoken";
        Axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        Axios({
            method: "POST",
            url: "/api/register/",
            data: {
                email: email,
                first_name: firstname,
                last_name: lastname,
                username: username,
                password: password,
            },
        })
            .then((response) => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: {
                        user: response.data,
                        isRegistered: true,
                    },
                });
            })
            .catch((error) => {
                // Extracting the error message
                // from the reponse of the server
                const errorText = JSON.parse(error.request.responseText);
                const errorMessage = Object.values(errorText)[0][0];
                console.log(Object.keys(error));

                dispatch({
                    type: REGISTER_FAILURE,
                    payload: {
                        errorMessage: errorMessage,
                        isRegistered: false,
                    },
                });
            });
    };
}
