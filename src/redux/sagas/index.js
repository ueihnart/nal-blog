import { takeLatest, call, put } from "redux-saga/effects";
import blogApi from "../../api/blogApi";
import { getBlogs } from "../actions";

function* fetchBlogsSaga(action) {
  try {
    // const blogs = yield call(blogApi.index, { page: 1, limit: 10 });
    const blogs = yield call(blogApi.index);
    yield put(getBlogs.getBlogsSuccess(blogs));
  } catch (error) {
    yield put(getBlogs.getBlogsFailure(error));
  }
}
function* mySaga() {
  yield takeLatest(getBlogs.getBlogsRequest, fetchBlogsSaga);
}
export default mySaga;
