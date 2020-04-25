import {
  GET_ALL_TRIPS_ERROR,
  GET_ALL_TRIPS_REQUEST,
  GET_ALL_TRIPS_SUCCESS,
} from './actions';

const INITIAL_STATE = {
  loading: false,
  data: []
}

export const trips = (state = INITIAL_STATE, action) => {

  const {
    type,
    payload
  } = action;

  switch (type) {
    case GET_ALL_TRIPS_REQUEST:
      console.log("REQUEST");
      console.log(state);
      return {
        loading: true,
        data: []
      };

    case GET_ALL_TRIPS_SUCCESS:
      console.log("SUCCESS");
      
      const {
        trips
      } = payload;

      return {
        loading: false,
        data: trips,
      };

    case GET_ALL_TRIPS_ERROR:
      return {
        loading: true,
        data: []
      };

    default:
      return state;
  }
}