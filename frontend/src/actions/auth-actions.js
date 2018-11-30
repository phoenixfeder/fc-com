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
                    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                    localStorage.setItem('session', result.session.session);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', result.session.hash);
                    localStorage.setItem('username', result.session.username)
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

export const authCheckState = () => {
    return dispatch => {
        const session = localStorage.getItem('session');
        if (!session) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const username = localStorage.getItem('username');
                dispatch(authSuccess(session, userId, username));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};