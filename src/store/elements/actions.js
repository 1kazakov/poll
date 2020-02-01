import { POLL_ADD, ELEMENT_ADD, SECTION_ADD, TITLE_SECTION, ELEMENT_CHANGE, ELEMENT_ADD_OPTION } from './actionTypes';

export const addPoll = (poll) => {
    return {
        type: POLL_ADD,
        payload: poll,
    }
}

export const addSection = (section) => {
    return {
        type: SECTION_ADD,
        payload: new Array(section)
    }
}

export const setSectionTitle = (obj) => {
    return {
        type: TITLE_SECTION,
        payload: obj,
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

export const addOptionRadio = (obj) => {
    return {
        type: ELEMENT_ADD_OPTION,
        payload: {
            value: obj.value,
            elementIndex: obj.elementIndex,
            optionIndex: obj.indexOption,
        }
    }
}