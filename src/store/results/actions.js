import { } from './actionTypes';

export const addResult = (poll) => {
    return {
        type: POLL_ADD,
        payload: poll,
    }
}
