import * as actionTypes from '../utils/const-actiontypes';
import { BACKEND_URL } from "../utils/const-paths";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        username: username
    };
};

export const authFail = (error) => {
    console.log(error);
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (username, password) => {
    return dispatch => {
       dispatch(authStart());
        fetch(BACKEND_URL + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "login": {
                    "user": {
                        "username": username,
                        "password": password
                    }
                }
            })
        }).then(results => {
            return results.json();
        }).then(result => {
            switch(result.status.code) {
                case 200:
                    dispatch(authSuccess(result.userdata));
                    break;

                default:
                    dispatch(authFail(result.status.message));
                    break;
            }
        }).catch(err => {
            dispatch(authFail(err));
        });
    };
};