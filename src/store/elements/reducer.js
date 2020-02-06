import { POLL_ADD, SECTION_ADD, TITLE_SECTION, ELEMENT_ADD, ELEMENT_CHANGE, ELEMENT_ADD_OPTION, ELEMENT_TRANSFER, ELEMENT_DELETE } from './actionTypes';
import { nth } from 'lodash';

const initialState = {
    elements: {}
}

const firstIndex = (elementIndex) => {
    let index = elementIndex.toString().split('');
    //let index =  Number(elementIndex[0] + elementIndex[1])     <------------------------------------
    index = Number(nth(index, 0));
    return index;
}
const secondIndex = (elementIndex) => {
    let index = elementIndex.toString().split('');
    index = Number(nth(index, 1));
    return index;
}
export const getElements = (state, index) => {
    if (!state.elementStore) {
        return state.elements.section.filter(element => element[0].index === index);
    }
    return state.elementStore.elements.section.filter(element => element[0].index === index);
}
export const getElement = (state, elementIndex) => {
    const index = firstIndex(elementIndex);
    const [elements] = getElements(state, index);
    let element = {};
    for (let i = 1; i < elements.length; i++) {
        if (elementIndex === elements[i].elementIndex) {
            element = elements[i];
        }
    }
    return element;
}
export const getElementByPosition = (state, position, indexSection) => {
    const [elements] = getElements(state, indexSection);
    let element = {};
    for (let i = 1; i < elements.length; i++) {
        if (position === elements[i].position) {
            element = elements[i];
        }
    }
    return element;
}

//REDUCE

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
        case ELEMENT_DELETE:
            {
                const { position, elementIndex } = action.payload;
                const indexSection = firstIndex(elementIndex);
                const [section] = getElements(state, indexSection);
                const elementsBefore = section.slice(0, position);
                let elementsAfter = section.slice(position + 1, section.length);
                for (let i = 0; i < elementsAfter.length; i++) {
                    elementsAfter[i].position = elementsAfter[i].position - 1;
                    // const index = firstIndex(elementsAfter[i].elementIndex);
                    // let subindex = secondIndex(elementsAfter[i].elementIndex);
                    // subindex = subindex - 1;
                    // elementsAfter[i].elementIndex = String(index) + subindex;
                }
                section.splice(0, section.length, ...elementsBefore, ...elementsAfter);
                let otherSection = state.elements.section.filter(section => section[0].index !== indexSection);
                otherSection = otherSection.concat(new Array(section));
                otherSection.sort((a, b) => a[0].index - b[0].index);
                return {
                    ...state,
                    elements: { ...state.elements, section: otherSection }
                }
            }
        case ELEMENT_CHANGE:
            {
                const { position } = action.payload;
                const index = firstIndex(action.payload.elementIndex);
                const elementIndex = secondIndex(action.payload.elementIndex);
                let [element] = state.elements.section.filter(section => section[0].index === index);
                element[position] = { ...element[position], ...action.payload };
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
                const index = firstIndex(action.payload.elementIndex);
                const elementIndex = secondIndex(action.payload.elementIndex);
                const { optionIndex, position } = action.payload;
                // let [element] = state.elements.section.filter(section => section[0].index === index);
                let [element] = getElements(state, index)
                if (action.payload.value !== null && action.payload.indexOption !== 99) {
                    element[position].counter += 1;
                }
                element[position].value[optionIndex] = action.payload.value;
                let otherElements = state.elements.section.filter(section => section[0].index !== index);
                otherElements.push(element);
                otherElements.sort((a, b) => a[0].index - b[0].index);
                return {
                    ...state,
                    elements: { ...state.elements, section: otherElements }
                }
            }
        case ELEMENT_TRANSFER:
            {
                const { position, elementIndex } = action.payload;
                const indexSection = firstIndex(elementIndex);
                const element = getElement(state, elementIndex);
                let [section] = state.elements.section.filter(section => section[0].index === indexSection);
                section = section.filter(element => element.elementIndex !== elementIndex);
                let otherSection = state.elements.section.filter(section => section[0].index !== indexSection);
                if (action.payload.transfer === 'up') {
                    if (position === 1) {
                        return { ...state };
                    }
                    let positionBefore = position - 1;
                    const elementBefore = getElementByPosition(state, positionBefore, indexSection);
                    section = section.filter(element => element.position !== positionBefore);
                    elementBefore.position = position;
                    element.position = positionBefore;
                    section = section.concat(elementBefore);
                } else {
                    if (position === section.length) {
                        return { ...state };
                    }
                    let positionAfter = position + 1;
                    const elementAfter = getElementByPosition(state, positionAfter, indexSection);
                    section = section.filter(element => element.position !== positionAfter);
                    elementAfter.position = position;
                    element.position = positionAfter;
                    section = section.concat(elementAfter);
                }
                section = section.concat(element);
                section = section.sort((a, b) => {
                    if (a.index) {
                        return -1;
                    } else if (b.index) {
                        return 1;
                    } else {
                        return a.position - b.position;
                    }
                })
                otherSection = otherSection.concat(new Array(section))
                otherSection.sort((a, b) => a[0].index - b[0].index);
                return {
                    ...state,
                    elements: { ...state.elements, section: otherSection }
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
export const getSectionCounter = (state, index) => {
    const [elements] = getElements(state, index);
    return elements[0].counter
}
export const getSection = (state) => {
    return state.elementStore.elements.section;
}
export const getOptions = (state, elementIndex) => {
    const element = getElement(state, elementIndex)
    const option = element.value;
    return option;
}
export const getCounter = (state, position, elementIndex) => {
    const element = getElement(state, elementIndex)
    const counter = element.counter;
    return counter;
}
// getElementByPosition = (state, position, indexSection)
