import { actionTypes } from './actionTypes';

const initialState = {
  value: 0
};

const actionHandlerMap = {
  [actionTypes.INCREMENT]: ({ value }) => {
    return { value: ++value };
  },
  [actionTypes.DECREMENT]: ({ value }) => {
    return { value: --value };
  },
}

export function reducer(state = initialState, action) {
  const handler = actionHandlerMap[action.type];
  return handler ? handler(state, action.payload) : state;
}
