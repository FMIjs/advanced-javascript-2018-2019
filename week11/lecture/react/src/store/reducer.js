import { combineReducers } from 'redux';
import { reducer as counterReducer } from '../Counter/store/reducer';
import { reducer as userReducer } from '../UserList/store/reducer';

export const reducer = combineReducers({
  counter: counterReducer,
  users: userReducer
});