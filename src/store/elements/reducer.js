import { SECTION_ADD, ELEMENT_ADD, ELEMENT_CHANGE } from './actionTypes';
import { nth } from 'lodash';

const initialState = {
    elements: []
}

export default function reduce(state = initialState, action) {
    // console.log(state)
    switch (action.type) {
        case SECTION_ADD:
            {
                let elements = state.elements;
                elements.push(action.payload)
                return {
                    ...state,
                    elements: elements
                }
            }
        case ELEMENT_ADD:
            {
                let index = action.payload.elementIndex.toString().split('');
                index = Number(nth(index, 0));
                let [element] = state.elements.filter(section => {
                    return section[0].index === index
                })
                element = element.concat(action.payload);
                let otherElements = state.elements.filter(section => {
                    return section[0].index !== index
                })
                otherElements.push(element);
                otherElements.sort((a, b) => a[0].index - b[0].index);
                return {
                    ...state,
                    elements: otherElements
                }
            }
        case ELEMENT_CHANGE:
            return {
                ...state
            }
        default:
            return state
    }
}
