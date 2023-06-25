import { SET_LOCATION } from "../ActionTypes";

export const getLocation = (data) => ({
  type: SET_LOCATION,
  payload: data,
});
