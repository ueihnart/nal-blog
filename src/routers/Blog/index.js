import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { LoadContent } from "../../components/shared/LoadContent";
import { getBlog } from "../../redux/actions";
import { blogState$ } from "../../redux/selectors";

export const Blog = () => {
  const dispatch = useDispatch();
  const blog = useSelector(blogState$);
  let { id } = useParams();
  useEffect(() => {
    dispatch(getBlog.getBlogRequest(id));
    return () => {
      dispatch(getBlog.getBlogClearData());
    };
  }, [dispatch, id]);
  console.log(blog);
  return (
    <LoadContent status={blog.state} error={blog.error}>
      <div className="jumbotron my-5">
        <h1 className="display-4">{blog.data.title}</h1>
        <div className="d-flex justify-content-center w-100">
          <img src={blog.data.image} alt={blog.data.title} className="w-70" />
        </div>
        <hr />
        {blog?.data?.createdAt && <p className="lead">{moment(blog.data.createdAt).format("YYYY/MM/DD HH:mm")}</p>}
        <p className="lead">{blog.data.content}</p>
        <div className="d-flex justify-content-end">
          <Link className="btn btn-primary" to={`/`}>
            Back Blogs
          </Link>
        </div>
      </div>
    </LoadContent>
  );
};
