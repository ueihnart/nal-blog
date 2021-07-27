import { INIT_STATE, STATUS_DATA } from "../../constant";
import { getBlogs, getType } from "../actions";

export default function blogsReducer(state = INIT_STATE.blogs, action) {
  switch (action.type) {
    case getType(getBlogs.getBlogsRequest):
      return {
        ...state,
        status: STATUS_DATA.REQUEST,
      };
    case getType(getBlogs.getBlogsSuccess):
      return {
        ...state,
        status: STATUS_DATA.SUCCESS,
        error: undefined,
        data: action.payload,
      };
    case getType(getBlogs.getBlogsFailure):
      console.log("action", action);
      return {
        ...state,
        status: STATUS_DATA.FAILURE,
        error: action.payload,
      };
    default:
      return state;
  }
}
