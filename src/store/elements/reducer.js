import { POLL_ADD, SECTION_ADD, TITLE_SECTION, ELEMENT_ADD, ELEMENT_CHANGE, ELEMENT_ADD_OPTION } from './actionTypes';
import { nth } from 'lodash';

const initialState = {
    elements: {}
}

export default function reduce(state = initialState, action) {
    // console.log(state)
    switch (action.type) {
        case POLL_ADD:
            {
                return {
                    ...state,
                    elements: action.payload,
                }
            }
        case SECTION_ADD:
            {
                let elements = state.elements;
                if (elements.section === undefined) {
                    elements.section = []
                }
                for (let element of action.payload) {
                    elements.section.push(element);
                }
                // elements.push(action.payload)
                return {
                    ...state,
                    elements: elements
                }
            }
        case TITLE_SECTION:
            {
                let index = action.payload.index;
                let [element] = state.elements.section.filter(section => section[0].index === index);
                element[0] = action.payload;
                let otherElements = state.elements.section.filter(section => section[0].index !== index)
                otherElements.push(element);
                otherElements.sort((a, b) => a[0].index - b[0].index);
                return {
                    ...state,
                    elements: { ...state.elements, section: otherElements }
                }
            }
        case ELEMENT_ADD:
            {
                let index = action.payload.elementIndex.toString().split('');
                index = Number(nth(index, 0));
                let [element] = state.elements.section.filter(section => section[0].index === index);
                element = element.concat(action.payload);
                let otherElements = state.elements.section.filter(section => section[0].index !== index)
                otherElements.push(element);
                otherElements.sort((a, b) => a[0].index - b[0].index);
                return {
                    ...state,
                    elements: { ...state.elements, section: otherElements }
                }
            }
        case ELEMENT_CHANGE:
            {
                let index = action.payload.elementIndex.toString().split('');
                const elementIndex = Number(nth(index, 1));
                index = Number(nth(index, 0));
                let [element] = state.elements.section.filter(section => section[0].index === index);
                element.splice(elementIndex, 1, action.payload);
                let otherElements = state.elements.section.filter(section => section[0].index !== index);
                otherElements.push(element);
                otherElements.sort((a, b) => a[0].index - b[0].index);
                return {
                    ...state,
                    elements: { ...state.elements, section: otherElements }
                }
            }
        case ELEMENT_ADD_OPTION:
            {
                let index = action.payload.elementIndex.toString().split('');
                const elementIndex = Number(nth(index, 1));
                const optionIndex = action.payload.optionIndex;
                index = Number(nth(index, 0));
                let [element] = state.elements.section.filter(section => section[0].index === index);
                if (element[elementIndex].value === undefined) {
                    element[elementIndex].value = []
                }
                element[elementIndex].value[optionIndex] = action.payload.value
                let otherElements = state.elements.section.filter(section => section[0].index !== index);
                otherElements.push(element);
                otherElements.sort((a, b) => a[0].index - b[0].index);
                return {
                    ...state,
                    elements: { ...state.elements, section: otherElements }
                }
            }
        default:
            return state
    }
}
