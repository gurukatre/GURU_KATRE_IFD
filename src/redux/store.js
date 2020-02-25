import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import rootSaga from "./sagas";

import { FlightReducer } from "./flights/FlightReducer";

const reducer = combineReducers({
    flights: FlightReducer
})


const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    reducer,
        compose(applyMiddleware(sagaMiddleware))
    );
    
    
sagaMiddleware.run(rootSaga);

export default store;