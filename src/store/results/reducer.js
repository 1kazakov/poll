import { RESET_RESULT, SET_RESULT, SET_ANSWER } from './actionTypes';
import { firstIndex } from '../elements/reducer';
import { keys } from '@material-ui/core/styles/createBreakpoints';

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
const getSection = (state, elementIndex) => {
    const sectionIndex = firstIndex(elementIndex);
    return state.result.answers['section' + sectionIndex]
}
const getSections = (state) => {
    return state.result.answers
}

//REDUCE

export default function reduce(state = initialState, action) {
    console.log('payload', action.payload)
    switch (action.type) {
        case RESET_RESULT:
            return initialState;
        // case POLL_ADD:
        //     {
        //         return {
        //             ...state,
        //             result: { ...state.elements, ...action.payload },
        //         }
        //     }
        case SET_RESULT:
            const { payload } = action;
            const sections = payload.section;
            let answers = {};
            for (let element of sections) {
                let answer = {};
                for (let i = 1; i < element.length; i++) {
                    if (element[i].name === 'checkbox') {
                        answer = []
                        for (let value of element[i].value) {
                            console.log('value', value)
                            answer = answer.concat({ value, checked: false })
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
                const { payload } = action;
                const { elementIndex, position, answer } = payload;
                const sectionIndex = firstIndex(elementIndex);
                let sections = getSections(state);
                sections = Object.assign({}, sections);
                Object.keys(sections).map(key => {
                    if (key === `section${sectionIndex}`) {
                        sections[key].answer['element' + position].answer = answer;
                    }
                })
                const result = { title: state.result.title, answers: sections }
                return { result }
            }
        default:
            return state
    }
}
