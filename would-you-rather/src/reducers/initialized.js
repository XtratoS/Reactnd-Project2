import { SET_INITIALIZED } from '../actions/initialized';

export function initialized(state = false, action) {
    switch(action.type) {
        case SET_INITIALIZED:
            return action.initialized;
        default:
            return state;
    }
}