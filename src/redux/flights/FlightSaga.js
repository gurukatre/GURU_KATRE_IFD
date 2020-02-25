import {
  FLIGHT_API_CALL_REQUEST,
  FLIGHT_API_CALL_SUCCESS,
  FLIGHT_API_CALL_FAILURE,
  FLIGHT_API_CALL_REQUEST_POST,
  FLIGHT_API_CALL_REQUEST_UPDATE,
  FLIGHT_API_CALL_REQUEST_DELETE
} from './constants'
import { takeLatest, call, put } from "redux-saga/effects";
import API from '../../services/FlightAPI'
import _ from 'lodash';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* getFlightSaga() {
  yield takeLatest(FLIGHT_API_CALL_REQUEST, getFlight);
}

export function* postFlightSaga() {
  yield takeLatest(FLIGHT_API_CALL_REQUEST_POST, saveFlight);
}

export function* putFlightSaga() {
  yield takeLatest(FLIGHT_API_CALL_REQUEST_UPDATE, updateFlight);
}

export function* deleteFlightSaga() {
  yield takeLatest(FLIGHT_API_CALL_REQUEST_DELETE, deleteFlight);
}

// function that makes the api request and returns a Promise for response
function getFlightCall() {
  return API.getFlights()
}

function saveFlightCall() {
  return API.postFlight()
}

function updateFlightCall() {
  return API.putFlight()
}

function deleteFlightCall() {
  return API.deleteFlight()
}

// worker saga: makes the api call when watcher saga sees the action
function* getFlight(state) {
  try {
    const response = yield call(getFlightCall);

    const success = response.data.success;
    // dispatch a success action to the store with the user
    yield put({ type: FLIGHT_API_CALL_SUCCESS, success, flights: {...response.data.flight} });
  
  } catch (error) {
    let __error = _.has(error, 'response.data') ? error.response.data : {};
    // dispatch a failure action to the store with the error
    yield put({ type: FLIGHT_API_CALL_FAILURE, error: __error.error });
  }
}

function* saveFlight(state) {
  try {
    const response = yield call(saveFlightCall);

    const success = response.data.success;
    // dispatch a success action to the store with the user
    yield put({ type: FLIGHT_API_CALL_SUCCESS, success, flights: {...response.data.profile} });
  
  } catch (error) {
    let __error = _.has(error, 'response.data') ? error.response.data : {};
    // dispatch a failure action to the store with the error
    yield put({ type: FLIGHT_API_CALL_FAILURE, error: __error.error });
  }
}

function* updateFlight(state) {
  try {
    const response = yield call(updateFlightCall);

    const success = response.data.success;
    // dispatch a success action to the store with the user
    yield put({ type: FLIGHT_API_CALL_SUCCESS, success, flights: {...response.data.profile} });
  
  } catch (error) {
    let __error = _.has(error, 'response.data') ? error.response.data : {};
    // dispatch a failure action to the store with the error
    yield put({ type: FLIGHT_API_CALL_FAILURE, error: __error.error });
  }
}
function* deleteFlight(state) {
  try {
    const response = yield call(deleteFlightCall);

    const success = response.data.success;
    // dispatch a success action to the store with the user
    yield put({ type: FLIGHT_API_CALL_SUCCESS, success, flights: {...response.data.profile} });
  
  } catch (error) {
    let __error = _.has(error, 'response.data') ? error.response.data : {};
    // dispatch a failure action to the store with the error
    yield put({ type: FLIGHT_API_CALL_FAILURE, error: __error.error });
  }
}