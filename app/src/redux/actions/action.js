import { baseUrl } from "../../config/config";
import { axiosRequest } from "../../utils/axios";

import { LOAD_USER } from "./ActionTypes";

export const searchByName = (keyword) => async (dispatch) => {
  try {
    const result = await axiosRequest(
      `${baseUrl}/search?keyword=${keyword}`,
      "get"
    );
    dispatch({ type: LOAD_USER, payload: result });
  } catch (error) {
    throw new Error("Error");
  }
};
export const searchBySign = (parms) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER, payload: parms });
  } catch (error) {}
};
