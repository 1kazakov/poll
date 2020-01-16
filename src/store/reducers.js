import { connectRouter } from 'connected-react-router';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import operatorStore from './operators/reducer';

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    operatorStore,
});

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === undefined ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }));
const initialState = {};
export default function configureStore(history) {
    return createStore(
        rootReducer(history),
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    )
}
