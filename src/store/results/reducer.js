import { RESET_RESULT } from './actionTypes';

const initialState = {
    result: {}
}

//REDUCE

export default function reduce(state = initialState, action) {
    // console.log(state)
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
        default:
            return state
    }
}


//Selectors

// export const getPoll = (state) => {
//     return state.elementStore.elements
// }
