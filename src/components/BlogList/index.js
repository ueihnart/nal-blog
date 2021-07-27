import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

export const BlogList = (props) => {
  const { blogs } = props;
  return (
    <ul className="list-unstyled">
      {blogs.map((blog) => {
        return (
          <li className="media m-2" key={blog.id}>
            <Link
              to={{
                pathname: `${routes.blog}`.replace(":id", blog.id),
              }}
            >
              <img className="mr-3" width="100px" src={blog.image} alt={blog.title} />
            </Link>
            <div className="media-body">
              <Link
                to={{
                  pathname: `${routes.blog}`.replace(":id", blog.id),
                }}
              >
                <h5 className="mt-0 mb-1">{blog.title}</h5>
              </Link>
              <small>{moment(blog.createdAt).format("YYYY/MM/DD HH:mm")}</small>
              <p>{blog.content}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
