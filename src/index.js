import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import { routerMiddleware, routerEnhancer } from './router';
// import './../assets/sass/admin/all.scss';


const store = createStore(
    reducer,
    compose(
        routerEnhancer,
        applyMiddleware(
            routerMiddleware,
            thunkMiddleware
        )
    )
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app-root')
);
