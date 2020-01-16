import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { createBrowserHistory as createHistory } from 'history';
import configureStore from './store/reducers';


const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
    ,
    document.getElementById('root')
);
