
import {
  getAllTripsInProgress,
  getAllTripsError,
  getAllTripsSuccess,
} from './actions';


export const getAllTrips = () => async (dispatch, getState) => {
  try {
    dispatch(getAllTripsInProgress());
    const response = await fetch('https://localhost:5001/api/trips/gettrips');
    const trips = await response.json();
    console.log(trips);
    dispatch(getAllTripsSuccess(trips));
  } catch (err) {
    console.log("Error in getAllTrips");
    dispatch(getAllTripsError());
  }
};

