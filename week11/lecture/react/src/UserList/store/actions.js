import { actionTypes } from './actionTypes';
import { apiURL } from '../../constants';

export function loadUsers() {
  return dispatch => {
    dispatch({ type: actionTypes.LOAD_USER_LIST, payload: null });
    fetch(`${apiURL}/users`)
      .then(response => {
        if (!response.ok) { throw new Error(response.statusText); }
        return response.json();
      })
      .then(users => {
        dispatch({ type: actionTypes.LOAD_USER_LIST_SUCCESS, payload: users });
      })
      .catch(error => {
        dispatch({ type: actionTypes.LOAD_USER_LIST_FAIL, payload: error.message });
      });
  }
}