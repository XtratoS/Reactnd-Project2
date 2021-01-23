import { LOGIN } from '../actions/loggedInUser';

export function loggedInUser(state = null, action) {
    switch(action.type) {
        case LOGIN:
            return action.id;
        default:
            return state;
    }
}