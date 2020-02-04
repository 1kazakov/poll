import { POLL_ADD, SECTION_ADD, TITLE_SECTION, ELEMENT_ADD, ELEMENT_CHANGE, ELEMENT_ADD_OPTION } from './actionTypes';
import { nth } from 'lodash';

const initialState = {
    elements: {}
}

const firstIndex = (elementIndex) => {
    let index = elementIndex.toString().split('');
    index = Number(nth(index, 0));
    return index;
}
const secondIndex = (elementIndex) => {
    let index = elementIndex.toString().split('');
    index = Number(nth(index, 1));
    return index;
}

export default function reduce(state = initialState, action) {
    // console.log(state)
    switch (action.type) {
        case POLL_ADD:
            {
                return {
                    ...state,
                    elements: { ...state.elements, ...action.payload },
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
                return {
                    ...state,
                    elements: elements
                }
            }
        case TITLE_SECTION:
            {
                let index = action.payload.index;
                let [element] = state.elements.section.filter(section => section[0].index === index);
                element[0] = { ...element[0], ...action.payload };
                let otherElements = state.elements.section.filter(section => section[0].index !== index)
                otherElements = otherElements.concat(new Array(element));
                if (otherElements.length > 1) {
                    otherElements.sort((a, b) => a[0].index - b[0].index);
                }
                return {
                    ...state,
                    elements: { ...state.elements, section: otherElements }
                }
            }
        case ELEMENT_ADD:
            {
                const index = firstIndex(action.payload.elementIndex);
                let [element] = state.elements.section.filter(section => section[0].index === index);
                element = element.concat(action.payload);
                let otherElements = state.elements.section.filter(section => section[0].index !== index)
                otherElements = otherElements.concat(new Array(element));
                otherElements.sort((a, b) => a[0].index - b[0].index);
                return {
                    ...state,
                    elements: { ...state.elements, section: otherElements }
                }
            }
        case ELEMENT_CHANGE:
            {
                const index = firstIndex(action.payload.elementIndex);
                const elementIndex = secondIndex(action.payload.elementIndex);
                let [element] = state.elements.section.filter(section => section[0].index === index);
                element[elementIndex] = { ...element[elementIndex], ...action.payload };
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
                // elementIndex: this.props.index, value: ''
                const index = firstIndex(action.payload.elementIndex);
                const elementIndex = secondIndex(action.payload.elementIndex);
                const optionIndex = action.payload.optionIndex;
                let [element] = state.elements.section.filter(section => section[0].index === index);
                // if (element[elementIndex].value === undefined) {
                //     element[elementIndex].value = []
                // }
                console.log('action.payload.value', action.payload.value)
                if (action.payload.value !== null && action.payload.indexOption !== 99) {
                    element[elementIndex].counter += 1;
                }
                element[elementIndex].value[optionIndex] = action.payload.value;
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


//Selectors

export const getPollTitle = (state) => {
    return state.elementStore.elements.title;
}
export const getPollSubtitle = (state) => {
    return state.elementStore.elements.subtitle;
}
export const getSection = (state) => {
    return state.elementStore.elements.section;
}
export const getElements = (state, index) => {
    return state.elementStore.elements.section.filter(element => Number(element[0].index) === index);
}
export const getElement = (state, elementIndex) => {
    const index = firstIndex(elementIndex);
    // const [elements] = state.elementStore.elements.section.filter(element => element[0].index == index);
    const [elements] = getElements(state, index);
    let element = {};
    for (let i = 1; i < elements.length; i++) {
        if (elementIndex === elements[i].elementIndex) {
            element = elements[i];
        }
    }
    return element;
}
export const getOptions = (state, elementIndex) => {
    const index = firstIndex(elementIndex);
    // const [elements] = state.elementStore.elements.section.filter(element => element[0].index == index);
    const [elements] = getElements(state, index);
    const [element] = elements.filter(item => !item.index && item.elementIndex === elementIndex);
    const option = element.value;
    return option;
}
export const getCounter = (state, elementIndex) => {
    const index = firstIndex(elementIndex);
    const [elements] = getElements(state, index);
    const [element] = elements.filter(item => !item.index && item.elementIndex === elementIndex);
    const counter = element.counter;
    return counter;
}
