import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogList } from "../../components/BlogList";
import { LoadContent } from "../../components/shared/LoadContent";
import { Pagination } from "../../components/shared/Pagination";
import { getBlogs } from "../../redux/actions";
import { blogsState$ } from "../../redux/selectors";

export const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(blogsState$);
  console.log(blogs);
  useEffect(() => {
    dispatch(getBlogs.getBlogsRequest());
    return () => {};
  }, [dispatch]);
  return (
    <div className="mt-3">
      <LoadContent status={blogs.status} error={blogs.error}>
        <BlogList blogs={blogs.data} />
        <Pagination />
      </LoadContent>
    </div>
  );
};
