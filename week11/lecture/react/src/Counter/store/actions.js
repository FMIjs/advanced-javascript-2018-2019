import { actionTypes } from './actionTypes';

export function increment() {
  return {
    type: actionTypes.INCREMENT,
    payload: null
  };
}

export function decrement() {
  return {
    type: actionTypes.DECREMENT,
    payload: null
  };
}
