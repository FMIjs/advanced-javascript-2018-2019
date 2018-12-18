import { actionTypes } from './actionTypes';

const initialState = {
  list: [],
  errorMessage: null,
  isLoading: false,
  entity: null,
  shouldLoadList: true
};

const setLoadingHandler = () => ({ isLoading: true });
const setErrorMessage = (_, errorMessage) => ({ errorMessage });

const actionHandlerMap = {

  [actionTypes.LOAD_USER_LIST]: setLoadingHandler,
  [actionTypes.LOAD_USER]: setLoadingHandler,
  [actionTypes.SAVE_USER]: setLoadingHandler,

  [actionTypes.LOAD_USER_LIST_FAIL]: setErrorMessage,
  [actionTypes.LOAD_USER_FAIL]: setErrorMessage,
  [actionTypes.SAVE_USER_FAIL]: setErrorMessage,

  [actionTypes.LOAD_USER_LIST_SUCCESS]: (_, users) => {
    return {
      isLoading: false,
      list: users,
      shouldLoadList: false
    }
  },

  [actionTypes.LOAD_USER_SUCCESS]: (_, user) => {
    return {
      isLoading: false,
      entity: user
    }
  },

  [actionTypes.SAVE_USER_SUCCESS]: ({ list: users }, user) => {
    if (!user.id) {
      users = users.concat(user)
    } else {
      users = users.map(u => u.id === user.id ? user : u);
    }
    return {
      isLoading: false,
      list: users,
      entity: null,
    };
  },

  [actionTypes.CLEAR_SELECTED_USER]: () => {
    return {
      entity: null,
    }
  },
}

export function reducer(state = initialState, action) {
  const handler = actionHandlerMap[action.type];
  return handler ? Object.assign({}, state, handler(state, action.payload)) : state;
}
