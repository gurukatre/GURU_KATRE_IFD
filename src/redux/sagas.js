import { getFlightSaga, postFlightSaga, putFlightSaga, deleteFlightSaga } from "./flights/FlightSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
        getFlightSaga(),
        postFlightSaga(),
        putFlightSaga(),
        deleteFlightSaga()
    ])
}