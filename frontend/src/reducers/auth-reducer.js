import * as actionTypes from '../utils/const-actiontypes';

const initialState = {
    session: null,
    userId: null,
    username: null,
    loading: false,
    error: null,
}

const authStart = ( state, action ) => {
    return { ...state, loading: true }
}

const authSuccess = (state, action ) => {
    return { ...state,  session: action.session, userId: action.userId, username: action.username, loading: false }
}

const authFail = (state, action) => {
    return { ...state, error: action.error, loading: false }
}

const authLogout = (state, action) => {
    return {...state, session: null, userId: null, username: null};
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: 
            return state;
    }
};

export default authReducer;