import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  trips,
} from './components/Trip/reducers';

const reducers = {
  trips,
};

const rootReducer = combineReducers(reducers);

// export const configureStore = () => applyMiddleware(thunk)(createStore)(rootReducer);
export const configureStore = () => createStore(
  rootReducer, 
  applyMiddleware(thunk)
);
