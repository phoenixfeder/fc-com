import * as actionTypes from '../utils/const-actiontypes';
import { BACKEND_URL } from "../utils/const-paths";
import { enqueueSnackbar } from "./notistack-snackbar-actions"

export const authStart = () => {
    
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (session, hash, userId, username) => {
    //Snackbar login success
    return {
        type: actionTypes.AUTH_SUCCESS,
        sessionHash: hash,
        session: session,
        userId: userId,
        username: username
    };
};

export const authFail = (error) => {
    //Snackbar error
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logoutNoAuth = () => {

    localStorage.removeItem('session');
    localStorage.removeItem('sessionHash');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    //Snackbar logout success
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const logout = () => {

    fetch(BACKEND_URL + '/login/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "authentication": {
                "session": localStorage.getItem('session'),
                "hash": localStorage.getItem('sessionHash')
            }
        })
    });
    
    return dispatch => {

        dispatch(enqueueSnackbar({
            message: "You are now logged out. See you, "  + localStorage.getItem('username') + "!",
            options: {
                variant: "success"
            }
        }));

        localStorage.removeItem('session');
        localStorage.removeItem('sessionHash');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');

        dispatch( {
            type: actionTypes.AUTH_LOGOUT 
        });

    };
};

export const checkAuthTimeout = (expirationTime) => {

    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
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
                    "username": username,
                    "password": password
                }
            })
        }).then(results => {
            return results.json();
        }).then(result => {
            switch(result.status.code) {
                
                case 200:
                    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                    localStorage.setItem('session', result.status.session.session);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userID', result.status.session.id);
                    localStorage.setItem('username', result.status.session.username);
                    localStorage.setItem('sessionHash', result.status.session.hash);
                    dispatch(authSuccess(result.status.session.session, result.status.session.hash, result.status.session.id, result.status.session.username));
                    dispatch(enqueueSnackbar({
                        message: "You are now logged in, " + result.status.session.username + "!",
                        options: {
                            variant: "success"
                        }
                    }));
                    break;

                case 404: 
                    dispatch(authFail("Invalid username or password."))
                    dispatch(enqueueSnackbar({
                        message: "Invalid username or password.",
                        options: {
                            variant: "error"
                        }
                    }));
                    break;

                case 405:
                    dispatch(authFail("Your account is not verified yet."))
                    dispatch(enqueueSnackbar({
                        message: "Your account is not verified yet.",
                        options: {
                            variant: "error"
                        }
                    }));
                    break;

                case 500:
                    dispatch(authFail("Invalid input. Are you sure that you used your username or E-Mail?"))
                    dispatch(enqueueSnackbar({
                        message: "Invalid input. Are you sure that you used your username or E-Mail?",
                        options: {
                            variant: "error"
                        }
                    }));
                    break;

                default:
                    dispatch(authFail("This should not happen. Please contact system admin."));
                    dispatch(enqueueSnackbar({
                        message: "This should not happen. Please contact system admin.",
                        options: {
                            variant: "error"
                        }
                    }));
                    break;
            }
        }).catch(err => {
            dispatch(authFail("This should not happen. Please contact system admin."));
            dispatch(enqueueSnackbar({
                message: "This should not happen. Please contact system admin.",
                options: {
                    variant: "error"
                }
            }));
        });

    };

};

export const authCheckState = () => {

    return dispatch => {

        const session = localStorage.getItem('session');
        if (!session) {
            dispatch(logoutNoAuth());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(enqueueSnackbar({
                    message: "You got logged out automatically, " + localStorage.getItem('username') + "!",
                    options: {
                        variant: "success"
                    }
                }));
                dispatch(logoutNoAuth());
            } else {
                const userId = localStorage.getItem('userId');
                const username = localStorage.getItem('username');
                const sessionHash = localStorage.getItem('sessionHash');
                dispatch(authSuccess(session, sessionHash, userId, username));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
        
    };

};