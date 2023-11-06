//define combine reducer here

import { LOAD_USER } from "../actions/ActionTypes";

const initialState = { user: [] };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
