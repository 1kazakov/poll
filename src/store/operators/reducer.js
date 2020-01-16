const initialState = {
    operators: [],
}

export default function reduce(state = initialState, action) {
    switch (action.type) {
        case 'OPERATOR_ADD':
            return state
        default:
            return state
    }
}
