import { SET_RESULT, SET_ANSWER } from './actionTypes';

export const setResult = (obj) => {
    return {
        type: SET_RESULT,
        payload: obj,
    }
}
export const setAnswer = (obj) => {
    return {
        type: SET_ANSWER,
        payload: obj,
    }
}
