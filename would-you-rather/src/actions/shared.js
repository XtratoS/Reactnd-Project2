import { getInitialData } from "../utils/api"
import { receiveUsers } from "./users";
import { showLoading, hideLoading } from "react-redux-loading";
import { setInitialized } from "./initialized";
import { receiveQuestions } from "./questions";

export const RECIEVE_DATA = 'RECIEVE_INITIAL_DATA'

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