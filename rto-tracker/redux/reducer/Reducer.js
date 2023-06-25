import { SET_LOCATION } from "../ActionTypes";

export const Reducers = (state = {}, action) => {
  switch (action.type) {
    case SET_LOCATION: {
      return (state = action.payload);
    }
    default:
      return state;
  }
};
