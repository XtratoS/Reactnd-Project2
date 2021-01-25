import { getInitialData, saveAnswer } from "../utils/api"
import { receiveUsers } from "./users";
import { showLoading, hideLoading } from "react-redux-loading";
import { setInitialized } from "./initialized";
import { receiveQuestions } from "./questions";

export const RECIEVE_DATA = 'RECIEVE_INITIAL_DATA';
export const ADD_ANSWER = 'ADD_ANSWER';

export function handleInitialData () {
    return function(dispatch) {
        dispatch(showLoading());
        getInitialData().then(({users, questions}) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(setInitialized(true));
            dispatch(hideLoading());
        });
    }
}

function addAnswer(answer) {
    return {
        type: ADD_ANSWER,
        answer
    }
}

export function handleAddAnswer(answer) {
    return function(dispatch) {
        dispatch(setInitialized(false));
        dispatch(showLoading());
        saveAnswer(answer).then((savedAnswer) => {
            dispatch(addAnswer(savedAnswer));
            dispatch(setInitialized(true));
            dispatch(hideLoading());
        })
    }
}