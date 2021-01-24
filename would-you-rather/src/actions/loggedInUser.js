import { hideLoading, showLoading } from "react-redux-loading";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(userId) {
    return {
        type: LOGIN,
        id: userId
    }
}

export function handleLogin(userId) {
    return (dispatch) => {
        dispatch(showLoading());
        setTimeout(() => {
            dispatch(login(userId));
            dispatch(hideLoading());
        }, 700);
    }
}

export function logout() {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        })
    }
}