import { hideLoading, showLoading } from "react-redux-loading";
import { saveQuestion } from '../utils/api';
import { setInitialized } from "./initialized";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(question, callback) {
    return (dispatch) => {
        dispatch(setInitialized(false));
        dispatch(showLoading());
        saveQuestion(question).then((savedQuestion) => {
            dispatch(addQuestion(savedQuestion));
            dispatch(setInitialized(true));
            dispatch(hideLoading());
            callback();
        });
    }
}