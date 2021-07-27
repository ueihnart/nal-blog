import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogList } from "../../components/BlogList";
import { LoadContent } from "../../components/shared/LoadContent";
import { Pagination } from "../../components/shared/Pagination";
import { getBlogs } from "../../redux/actions";
import { blogsState$ } from "../../redux/selectors";
import { paginatedItems } from "../../utils";

const ACTIONS_REDUCE = {
  INIT_STATE: "INIT_STATE",
  SET_PAGE: "SET_PAGE",
};

export const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(blogsState$);
  useEffect(() => {
    dispatch(getBlogs.getBlogsRequest());
    return () => {};
  }, [dispatch]);
  const initialState = {
    page: 1,
    limit: 10,
    total: 0,
    data: [],
    pageData: [],
    sortDate: true,
    sortTitle: null,
    search: "",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS_REDUCE.INIT_STATE:
        return { ...initialState, data: action.payload.data, pageData: paginatedItems(action.payload.data, initialState.page, initialState.limit), total: action.payload.data.length };
      case ACTIONS_REDUCE.SET_PAGE:
        return { ...state, pageData: paginatedItems(state.data, action.payload, state.limit), page: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatchReducer] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatchReducer({ type: ACTIONS_REDUCE.INIT_STATE, payload: blogs });
    return () => {};
  }, [blogs]);

  const handlePage = (page) => {
    dispatchReducer({ type: ACTIONS_REDUCE.SET_PAGE, payload: page });
  };
  const handleReload = async () => {
    dispatchReducer({ type: ACTIONS_REDUCE.INIT_STATE, payload: blogs });
  };
  const handleSort = async (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="mt-3">
      <LoadContent status={blogs.status} error={blogs.error}>
        <div className="row justify-content-end">
          <div className="col-8 input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-funnel"></i>
              </span>
            </div>
            <select className="custom-select" name="sortDate" id="inputGroupSelect02" defaultValue={state.sortDate} onChange={(e) => handleSort(e)}>
              <option value={null}>Sort date...</option>
              <option value={true}>Ascending </option>
              <option value={false}>Descending</option>
            </select>
            <select className="custom-select" name="sortTitle" id="inputGroupSelect02" defaultValue={state.sortDate}>
              <option value={null}>Sort title...</option>
              <option value={true}>Ascending </option>
              <option value={false}>Descending</option>
            </select>
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-search"></i>
              </span>
            </div>
            <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" />
            <div className="input-group-append">
              <button className="btn btn-primary" title="Reload" onClick={() => handleReload()}>
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
        </div>
        <BlogList blogs={state.pageData} />
        <Pagination onChangePage={handlePage} total={state.total} limit={state.limit} page={state.page} />
      </LoadContent>
    </div>
  );
};
