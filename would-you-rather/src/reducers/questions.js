import { RECEIVE_QUESTIONS, ADD_QUESTION } from "../actions/questions";
import { ADD_ANSWER } from "../actions/shared";

export function questions(state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return action.questions
        case ADD_QUESTION:
            return {...state, [action.question.id]: {...action.question}}
        case ADD_ANSWER:
            console.log(action);
            const { questionId, userId, answer } = action.answer;
            return {
                ...state,
                [questionId]: {
                    ...state[questionId],
                    [answer]: {
                        ...state[questionId][answer],
                        votes: state[questionId][answer].votes.concat([userId])
                    }
                }
            }
        default:
            return state
    }
}