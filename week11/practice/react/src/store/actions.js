import { actionTypes } from './actionTypes';
import { fetchUsers, fetchUser } from './effects/user';


export function loadUsers() {
  return dispatch => {
    dispatch({ type: actionTypes.LOAD_USER_LIST, payload: null });
    fetchUsers().then(users => {
      dispatch({ type: actionTypes.LOAD_USER_LIST_SUCCESS, payload: users });
    }).catch(error => {
      dispatch({ type: actionTypes.LOAD_USER_LIST_FAIL, payload: error.message });
    });
  }
}

export function loadUser(id) {
  return dispatch => {
    dispatch({ type: actionTypes.LOAD_USER, payload: null });
    fetchUser(id).then(users => {
      dispatch({ type: actionTypes.LOAD_USER_SUCCESS, payload: users });
    }).catch(error => {
      dispatch({ type: actionTypes.LOAD_USER_FAIL, payload: error.message });
    });
  }
}

export function saveUser(user, onSuccess, onFail) {
  return dispatch => {
    dispatch({ type: actionTypes.SAVE_USER, payload: null });
    console.log(`Simulating user save`);
    setTimeout(() => {
      if (onSuccess) { onSuccess(user); }
      dispatch({ type: actionTypes.SAVE_USER_SUCCESS, payload: user });
    }, 1000);
  };
}

export function clearSelectedUser() {
  return {
    type: actionTypes.CLEAR_SELECTED_USER,
    payload: null
  }
}