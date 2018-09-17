import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { test1,test2 } from '../middlewares'
import reducers from '../reducer';
import createHistory from 'history/createBrowserHistory';
export const history = createHistory()

export function configureStore(initialState){
    return createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(..._getMiddleware()),
        )
    )
}

function _getMiddleware() {
    let middleware = [
        routerMiddleware(history),
        thunk,
    ];
    return middleware;
}

