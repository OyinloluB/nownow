import AuthActionTypes from './auth.types';

export const signUpStart = () => ({
    type: AuthActionTypes.SIGN_UP_START
});

export const signUpSuccess = () => ({
    type: AuthActionTypes.SIGN_UP_SUCCESS
});

export const signUpFailure = (error) => ({
    type: AuthActionTypes.SIGN_UP_FAILURE,
    payload: error
});

export const signUp = () => {
    return async dispatch => {
        dispatch(signUpStart());
        try {
            // TODO: Make Request for Sign up
            dispatch(signUpSuccess());
        } catch (error) {
            dispatch(signUpFailure(error));
        }
    }
}

export const signInStart = () => ({
    type: AuthActionTypes.SIGN_IN_START
});

export const signInSuccess = () => ({
    type: AuthActionTypes.SIGN_IN_SUCCESS
});

export const signInFailure = (error) => ({
    type: AuthActionTypes.SIGN_IN_FAILURE,
    payload: error
});


export const signIn = () => {
    return async dispatch => {
        dispatch(signInStart());
        try {
            // TODO: Make Request for Sign in
            dispatch(signInSuccess());
        } catch (error) {
            dispatch(signInFailure(error));
        }
    }
}
