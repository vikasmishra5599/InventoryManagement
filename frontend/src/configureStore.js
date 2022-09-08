import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './redux/sagas/sagas';
import { createRootReducer } from './redux/reducers';
import {LOGOFF} from "./redux/actionTypes";
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const resetEnhancer = rootReducer => (state, action) => {
    if (action.type !== LOGOFF) return rootReducer(state, action);

    const newState = rootReducer(undefined, {});
    newState.router = state.router;
    return newState;
};

export default function configureStore(initialState){

    const middlewares = [sagaMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const composeEnhancers = composeWithDevTools({
        trace: true,
        traceLimit: 25
    });

    const appReducers = resetEnhancer(createRootReducer());
    const store = createStore(
        appReducers,
        initialState,
        composeEnhancers(middlewareEnhancer)
    );

    sagaMiddleware.run(rootSaga);
    return store;
}
