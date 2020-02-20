import {
    POLL_ADD,
    SECTION_ADD,
    SECTION_DELETE,
    SECTION_TRANSFER,
    TITLE_SECTION,
    ELEMENT_ADD,
    ELEMENT_CHANGE,
    ELEMENT_ADD_OPTION,
    ELEMENT_TRANSFER,
    ELEMENT_DELETE
} from './actionTypes';

const initialState = {
    elements: {}
}

export const firstIndex = (elementIndex) => {
    let index = Number(elementIndex[0] + elementIndex[1]);
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
export const getSection = (state) => {
    if (!state.elementStore) {
        return state.elements.section;
    }
    return state.elementStore.elements.section;
}


//REDUCE

export default function reduce(state = initialState, action) {
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
        case SECTION_DELETE:
            {
                const { index } = action.payload;
                let sections = getSection(state);
                sections = sections.filter(section => section[0].index !== index);
                const sectionDelete = new Array({ index: null });
                sections.push(sectionDelete);
                return {
                    ...state,
                    elements: { ...state.elements, section: sections }
                }
            }
        case SECTION_TRANSFER:
            {
                let { index, position, transfer } = action.payload;
                let sections = getSection(state);
                const [section] = getElements(state, index);
                sections = sections.filter(section => section[0].index !== index);
                if (transfer === 'up') {
                    if (position === 0) {
                        return { ...state };
                    }
                    const positionBefore = position - 1;
                    const [sectionBefore] = sections.filter(section => section[0].position === positionBefore);
                    sections = sections.filter(section => section[0].position !== positionBefore);
                    sectionBefore[0].position = position;
                    section[0].position = positionBefore;
                    sections = sections.concat(new Array(sectionBefore));
                } else {
                    if (position === sections.length) {
                        return { ...state };
                    }
                    const positionAfter = position + 1;
                    const [sectionAfter] = sections.filter(section => section[0].position === positionAfter);
                    sections = sections.filter(section => section[0].position !== positionAfter);
                    sectionAfter[0].position = position;
                    section[0].position = positionAfter;
                    sections = sections.concat(new Array(sectionAfter));
                }
                sections = sections.concat(new Array(section));
                sections.sort((a, b) => a[0].position - b[0].position);
                return { ...state, elements: { ...state.elements, section: sections } }
            }
        case TITLE_SECTION:
            {
                let { index } = action.payload;
                let [element] = getElements(state, index);
                element[0] = { ...element[0], ...action.payload };
                let otherElements = state.elements.section.filter(section => section[0].index !== index)
                otherElements = otherElements.concat(new Array(element));
                if (otherElements.length > 1) {
                    otherElements.sort((a, b) => a[0].position - b[0].position);
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
                otherElements.sort((a, b) => a[0].position - b[0].position);
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
                }
                section.splice(0, section.length, ...elementsBefore, ...elementsAfter);
                let otherSection = state.elements.section.filter(section => section[0].index !== indexSection);
                otherSection = otherSection.concat(new Array(section));
                otherSection.sort((a, b) => a[0].position - b[0].position);
                return {
                    ...state,
                    elements: { ...state.elements, section: otherSection }
                }
            }
        case ELEMENT_CHANGE:
            {
                const { position } = action.payload;
                const index = firstIndex(action.payload.elementIndex);
                let [element] = state.elements.section.filter(section => section[0].index === index);
                element[position] = { ...element[position], ...action.payload };
                let otherElements = state.elements.section.filter(section => section[0].index !== index);
                otherElements.push(element);
                otherElements.sort((a, b) => a[0].position - b[0].position);
                return {
                    ...state,
                    elements: { ...state.elements, section: otherElements }
                }
            }
        case ELEMENT_ADD_OPTION:
            {
                const index = firstIndex(action.payload.elementIndex);
                const { optionIndex, position } = action.payload;
                let [element] = getElements(state, index);
                if (action.payload.value !== null && action.payload.indexOption !== 99 && element[position].value[+optionIndex] === undefined) {
                    element[position].counter += 1;
                }
                if (typeof action.payload.value !== 'object' || action.payload.value === null) {
                    element[position].value[optionIndex] = action.payload.value;
                } else {
                    element[position].value[+optionIndex] = { ...element[position].value[+optionIndex], ...action.payload.value }
                }

                let otherElements = state.elements.section.filter(section => section[0].index !== index);
                otherElements.push(element);
                otherElements.sort((a, b) => a[0].position - b[0].position);
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
                otherSection.sort((a, b) => a[0].position - b[0].position);
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

export const getPoll = (state) => {
    return state.elementStore.elements
}

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
export const getSectionPosition = (state, index) => {
    const [elements] = getElements(state, index);
    return elements[0].position;
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
