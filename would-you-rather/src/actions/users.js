import { hideLoading, showLoading } from "react-redux-loading";
import { saveUser } from "../utils/api";
import { formatUser } from "../utils/helpers";

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER = 'ADD_USER';

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}

export function handleAddUser(user) {
    const formattedUser = formatUser(user);
    return function(dispatch) {
        dispatch(showLoading());
        saveUser(formattedUser).then((addedUser) => {
            dispatch(addUser(addedUser));
            dispatch(hideLoading());
        });
    }
}