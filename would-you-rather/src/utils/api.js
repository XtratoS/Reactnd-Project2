import { _getQuestions, _getUsers } from "./_DATA";

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