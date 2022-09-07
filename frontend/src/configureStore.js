import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import rootSaga from './redux/sagas/sagas';
import { createRootReducer } from './redux/reducers';
import {LOGOFF} from "./redux/actionTypes";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const resetEnhancer = rootReducer => (state, action) => {
    if (action.type !== LOGOFF) return rootReducer(state, action);

    const newState = rootReducer(undefined, {});
    newState.router = state.router;
    return newState;
};

export default function configureStore(initialState){

    const middlewares = [sagaMiddleware, routerMiddleware(history)];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const composeEnhancers = composeWithDevTools({
        trace: true,
        traceLimit: 25
    });

    const appReducers = resetEnhancer(createRootReducer(history));
    const store = createStore(
        appReducers,
        initialState,
        composeEnhancers(middlewareEnhancer)
    );

    sagaMiddleware.run(rootSaga);
    return store;
}
