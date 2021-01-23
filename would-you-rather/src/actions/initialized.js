export const SET_INITIALIZED = 'SET_INITIALIZED';

export function setInitialized(initialized) {
    return {
        type: SET_INITIALIZED,
        initialized
    }
}