import { createActions } from "redux-actions";

export const getType = (reduxAction) => reduxAction().type;
export const getBlogs = createActions({
  getBlogsRequest: undefined,
  getBlogsSuccess: (payload) => payload,
  getBlogsFailure: (error) => error,
});
