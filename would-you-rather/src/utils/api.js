import { _getQuestions, _getUsers, _saveUser, _saveQuestion, _saveQuestionAnswer } from "./_DATA";

export async function getInitialData() {
    let usersPromise = _getUsers();
    let questionsPromise = _getQuestions();
    let promises = [
        usersPromise,
        questionsPromise
    ];

    const [users, questions] = await Promise.all(promises);
    return ({ users, questions });
}

export async function saveUser(user) {
    console.log("Request received by API");
    const newUser = await _saveUser(user);
    return newUser;
}

export async function saveQuestion(question) {
    const savedQuestion = await _saveQuestion(question);
    return savedQuestion;
}

export async function saveAnswer(_answer) {
    const { userId, questionId, answer } = _answer
    const savedAnswer = await _saveQuestionAnswer({
        authedUser: userId,
        qid: questionId,
        answer
    });
    return savedAnswer;
}