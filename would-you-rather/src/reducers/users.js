import { RECEIVE_USERS, ADD_USER } from "../actions/users";
import { ADD_ANSWER } from "../actions/shared";

export function users(state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return action.users;
        case ADD_USER:
            return {...state, ...action.user}
        case ADD_ANSWER:
            const { userId, questionId, answer } = action.answer
            return {
                ...state,
                [userId]: {
                    ...state[userId],
                    answers: {
                        ...state[userId].answers,
                        [questionId]: answer
                    }
                }
            }
        default:
            return state;
    }
}