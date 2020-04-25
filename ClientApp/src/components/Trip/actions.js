export const GET_ALL_TRIPS_REQUEST = 'GET_ALL_TRIPS_REQUEST';
export const getAllTripsInProgress = () => ({
  type: GET_ALL_TRIPS_REQUEST,
});

export const GET_ALL_TRIPS_SUCCESS = 'GET_ALL_TRIPS_SUCCESS';
export const getAllTripsSuccess = (trips) => ({
  type: GET_ALL_TRIPS_SUCCESS,
  payload: {trips}
});

export const GET_ALL_TRIPS_ERROR = 'GET_ALL_TRIPS_ERROR';
export const getAllTripsError = () => ({
  type: GET_ALL_TRIPS_ERROR,
});