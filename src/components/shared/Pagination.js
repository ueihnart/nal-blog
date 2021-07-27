import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

export const Pagination = () => {
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className="page-item disabled">
          <Link
            className="page-link "
            to={{
              pathname: routes.home,
              search: `?page=${1}`,
              state: { fromDashboard: true },
            }}
            tabIndex="-1"
            aria-disabled="true"
          >
            Previous
          </Link>
        </li>
        <li className="page-item active">
          <Link
            className="page-link active"
            to={{
              pathname: routes.home,
              search: `?page=${1}`,
              state: { fromDashboard: true },
            }}
          >
            1
          </Link>
        </li>
        <li className="page-item" aria-current="page">
          <Link
            className="page-link"
            to={{
              pathname: routes.home,
              search: `?page=${2}`,
              state: { fromDashboard: true },
            }}
          >
            2
          </Link>
        </li>
        <li className="page-item">
          <Link
            className="page-link"
            to={{
              pathname: routes.home,
              search: `?page=${3}`,
              state: { fromDashboard: true },
            }}
          >
            3
          </Link>
        </li>
        <li className="page-item">
          <Link
            className="page-link"
            to={{
              pathname: routes.home,
              search: `?page=${1}`,
              state: { fromDashboard: true },
            }}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};
