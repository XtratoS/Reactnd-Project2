export const LOGIN = 'LOGIN';

export function login(userId) {
    return {
        type: LOGIN,
        id: userId
    }
}