import * as actionTypes from '../utils/const-actiontypes';
import { BACKEND_URL } from "../utils/const-paths";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (session, userId, username) => {
    console.log(session + userId + username);
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: session,
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
        fetch(BACKEND_URL + '/login/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user": {
                    username: username,
                    password: password
                }
            })
        }).then(results => {
            return results.json();
        }).then(result => {
            switch(result.status.code) {
                case 200:
                    dispatch(authSuccess(result.session.session, result.session.hash, result.session.username));
                    break;

                case 404: 
                    dispatch(authFail("Invalid username or password."))
                    break;

                case 500:
                    dispatch(authFail("Invalid input. Are you sure that you used your username or E-Mail?"))
                    break;

                default:
                    dispatch(authFail("This should not happen. Please contact system admin."));
                    break;
            }
        }).catch(err => {
            dispatch(authFail("This should not happen. Please contact system admin."));
        });
    };
};