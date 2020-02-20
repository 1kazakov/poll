import { RESET_RESULT, SET_RESULT, SET_ANSWER } from './actionTypes';
import { firstIndex } from '../elements/reducer';

const initialState = {
    result: {}
}

//Selectors

export const getElement = (state, elementIndex, position) => {
    const sectionIndex = firstIndex(elementIndex);
    if (!state.resultStore) {
        return state.result.answers['section' + sectionIndex].answer['element' + position];
    } else {
        return state.resultStore.result.answers['section' + sectionIndex].answer['element' + position];
    }
}
const getSections = (state) => {
    return state.result.answers
}

//REDUCE

export default function reduce(state = initialState, action) {
    switch (action.type) {
        case RESET_RESULT:
            return initialState;
        case SET_RESULT:
            const { payload } = action;
            const sections = payload.section;
            let answers = {};
            for (let element of sections) {
                let answer = {};
                for (let i = 1; i < element.length; i++) {
                    if (element[i].name === 'checkbox') {
                        answer = [];
                        for (let value of element[i].value) {
                            answer = answer.concat({ value, checked: false })
                        }
                        answer['element' + i] = { question: element[i].question, answer }
                    } else if (element[i].name === 'fotoCheckbox') {
                        answer = [];
                        for (let value of element[i].value) {
                            if (value !== null) {
                                answer = answer.concat({ value: value.description, checked: false })
                            } else {
                                answer = answer.concat({ value: null })
                            }
                        }
                        answer['element' + i] = { question: element[i].question, answer }
                    } else {
                        answer['element' + i] = { question: element[i].question, answer: '' }
                    }

                }
                answers['section' + element[0].index] = { title: element[0].title, answer }
            }
            let result = {
                title: payload.title,
                // user: .......
                answers,

            }
            return { result }
        case SET_ANSWER:
            {
                const { elementIndex, position, answer, answerIndex } = action.payload;
                const sectionIndex = firstIndex(elementIndex);
                let sections = getSections(state);
                sections = Object.assign({}, sections);
                if (answerIndex === undefined) {
                    Object.keys(sections).map(key => {
                        if (key === `section${sectionIndex}`) {
                            sections[key].answer['element' + position].answer = answer;
                        }
                    })
                } else {
                    Object.keys(sections).map(key => {
                        if (key === `section${sectionIndex}`) {
                            if (answerIndex === '99') {
                                typeof answer === 'string' ? sections[key].answer['element' + position].answer[answerIndex].description = answer :
                                    sections[key].answer['element' + position].answer[answerIndex].checked = answer;
                            } else {
                                sections[key].answer['element' + position].answer[answerIndex].checked = answer;
                            }
                        }
                    })
                }
                const result = { title: state.result.title, answers: sections }
                return { result }
            }
        default:
            return state
    }
}
