import {
  FLIGHT_API_CALL_REQUEST,
  FLIGHT_API_CALL_SUCCESS,
  FLIGHT_API_CALL_FAILURE
} from './constants'


// reducer with initial state
const initialState = {
  fetching: false,
  success: false,
  error: null
};

export function FlightReducer(state = initialState, action) {
    switch (action.type) {
      case FLIGHT_API_CALL_REQUEST:
        return { ...state, fetching: true, error: null, };
      case FLIGHT_API_CALL_SUCCESS:
        return { ...state, fetching: false, success: action.success, flights: action.flights };
      case FLIGHT_API_CALL_FAILURE:
        return { ...state, fetching: false, success: false, error: action.error, user: null };
      default:
        return state;
    }
  }