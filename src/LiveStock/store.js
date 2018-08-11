import { createStore , combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware  from 'redux-saga';


import liveStocksReducer from './reducer';
import { rootSaga } from './api';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	combineReducers({ liveStocksReducer }),
	applyMiddleware(sagaMiddleware)
	);

// root saga to handle fetch stocks for single or multiple symbols
sagaMiddleware.run(rootSaga);

export default store;

