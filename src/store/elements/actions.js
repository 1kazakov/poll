import { ELEMENT_ADD, SECTION_ADD, ELEMENT_CHANGE } from './actionTypes';

export const addSection = (section) => {
    return {
        type: SECTION_ADD,
        payload: new Array(section)
    }
}

export const addElement = (element) => {
    return {
        type: ELEMENT_ADD,
        payload: element
    }
}

export const changeElement = (element) => {
    return {
        type: ELEMENT_CHANGE,
        payload: element
    }
}
