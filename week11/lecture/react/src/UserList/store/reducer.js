import { actionTypes } from './actionTypes';

const initialState = {
  list: [],
  isLoading: false
};

const actionHandlerMap = {
  [actionTypes.LOAD_USER_LIST]: (state) => {
    return {
      isLoading: true
    };
  },
  [actionTypes.LOAD_USER_LIST_SUCCESS]: (_, users) => {
    return {
      isLoading: false,
      list: users
    }
  }

}

export function reducer(state = initialState, action) {
  const handler = actionHandlerMap[action.type];
  return handler ? Object.assign({}, state, handler(state, action.payload)) : state;
}
