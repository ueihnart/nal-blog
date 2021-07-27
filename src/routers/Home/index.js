import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogList } from "../../components/BlogList";
import { LoadContent } from "../../components/shared/LoadContent";
import { Pagination } from "../../components/shared/Pagination";
import { getBlogs } from "../../redux/actions";
import { blogsState$ } from "../../redux/selectors";
import { paginatedItems, sortData, toSlug } from "../../utils";

const ACTIONS_REDUCE = {
  INIT_STATE: "INIT_STATE",
  SET_PAGE: "SET_PAGE",
  SORT_DATA: "SORT_DATA",
  SEARCH_DATA: "SEARCH_DATA",
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
    sortData: "",
    searchData: "",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS_REDUCE.INIT_STATE:
        return { ...initialState, data: [...action.payload.data], pageData: paginatedItems([...action.payload.data], initialState.page, initialState.limit), total: action.payload.data.length };
      case ACTIONS_REDUCE.SET_PAGE:
        return { ...state, pageData: paginatedItems(state.data, action.payload, state.limit), page: action.payload };
      case ACTIONS_REDUCE.SORT_DATA:
        const sort = action.payload.split(" ");
        const _sortData = !!sort[0] ? sortData(state.data, sort[0], sort[1]) : blogs.data;
        return { ...state, pageData: paginatedItems(_sortData, 1, state.limit), page: 1, sortData: action.payload };
      case ACTIONS_REDUCE.SEARCH_DATA:
        const _searchData = [...blogs.data].filter((item) => toSlug(item.title).includes(toSlug(action.payload)) || toSlug(item.createdAt).includes(toSlug(action.payload)));
        console.log(_searchData);
        return { ...state, data: _searchData, pageData: paginatedItems(_searchData, 1, state.limit), total: _searchData.length, page: 1, searchData: action.payload };
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
  const handleReload = () => {
    dispatchReducer({ type: ACTIONS_REDUCE.INIT_STATE, payload: blogs });
  };
  const handleSort = (e) => {
    dispatchReducer({ type: ACTIONS_REDUCE.SORT_DATA, payload: e.target.value });
  };
  const handleSearch = (e) => {
    dispatchReducer({ type: ACTIONS_REDUCE.SEARCH_DATA, payload: e.target.value });
  };
  const handleClearSearch = () => {
    dispatchReducer({ type: ACTIONS_REDUCE.SEARCH_DATA, payload: "" });
  };
  return (
    <div className="">
      <LoadContent status={blogs.status} error={blogs.error}>
        <div className="row justify-content-end mt-3">
          <div className="d-flex col-lg-6 col-md-8 col-sm-12">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-funnel"></i>
                </span>
              </div>
              <select className="custom-select" name="sortData" id="inputGroupSelect02" value={state.sortData} onChange={(e) => handleSort(e)}>
                <option value={""}>Sort...</option>
                <option value={"createdAt Ascending"}>Date Ascending </option>
                <option value={"createdAt Descending"}>Date Descending</option>
                <option value={"title Ascending"}>Title Ascending </option>
                <option value={"title Descending"}>Title Descending</option>
              </select>
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-search"></i>
                </span>
              </div>
              <input type="text" className="form-control" name="searchData" value={state.searchData} onChange={(e) => handleSearch(e)} />
              {!!state.searchData && (
                <div className={`input-group-append`}>
                  <button className="btn btn-outline-secondary" title="Reload" onClick={() => handleClearSearch()}>
                    <i className="bi bi-x-circle"></i>
                  </button>
                </div>
              )}
            </div>
            <div>
              <button className="btn btn-primary ml-2" title="Reload" onClick={() => handleReload()}>
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="list-group my-2 border" style={{ height: "80vh", overflowY: "scroll" }}>
          <BlogList blogs={state.pageData} />
        </div>
        <Pagination onChangePage={handlePage} total={state.total} limit={state.limit} page={state.page} />
      </LoadContent>
    </div>
  );
};
