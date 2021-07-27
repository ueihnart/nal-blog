import { INIT_STATE, STATUS_DATA } from "../../constant";
import { getBlog, getType } from "../actions";

export default function blogReducer(state = INIT_STATE.blog, action) {
  switch (action.type) {
    case getType(getBlog.getBlogRequest):
      return {
        ...state,
        status: STATUS_DATA.REQUEST,
        data: {},
      };
    case getType(getBlog.getBlogSuccess):
      return {
        ...state,
        status: STATUS_DATA.SUCCESS,
        error: undefined,
        data: action.payload,
      };
    case getType(getBlog.getBlogFailure):
      return {
        ...state,
        status: STATUS_DATA.FAILURE,
        error: action.payload,
        data: {},
      };
    case getType(getBlog.getBlogClearData):
      return INIT_STATE.blog;
    default:
      return state;
  }
}
