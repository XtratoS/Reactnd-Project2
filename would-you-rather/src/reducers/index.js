import { combineReducers } from 'redux';
import { users } from './users';
import { questions } from './questions';
import { initialized } from './initialized';
import { loggedInUser } from './loggedInUser'
import { loadingBarReducer } from 'react-redux-loading';

const reducer = combineReducers({
    loadingBar: loadingBarReducer,
    users,
    questions,
    loggedInUser,
    initialized
});

export default reducer;