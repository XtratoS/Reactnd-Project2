import { LOGIN, LOGOUT } from '../actions/loggedInUser';

export function loggedInUser(state = null, action) {
    switch(action.type) {
        case LOGIN:
            return action.id;
        case LOGOUT:
            return null;
        default:
            return state;
    }
}