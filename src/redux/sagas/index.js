import { takeLatest, call, put } from "redux-saga/effects";
import blogApi from "../../api/blogApi";
import { getBlog, getBlogs } from "../actions";

function* fetchBlogsSaga(action) {
  try {
    // const blogs = yield call(blogApi.index, { page: 1, limit: 10 });
    const blogs = yield call(blogApi.index);
    yield put(getBlogs.getBlogsSuccess(blogs));
  } catch (error) {
    yield put(getBlogs.getBlogsFailure(error));
  }
}
function* fetchBlogSaga(action) {
  try {
    const blog = yield call(blogApi.get, action.payload);
    yield put(getBlog.getBlogSuccess(blog));
  } catch (error) {
    yield put(getBlog.getBlogFailure(error));
  }
}
function* mySaga() {
  yield takeLatest(getBlogs.getBlogsRequest, fetchBlogsSaga);
  yield takeLatest(getBlog.getBlogRequest, fetchBlogSaga);
}
export default mySaga;
