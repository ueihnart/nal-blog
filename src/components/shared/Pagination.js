import React from "react";

export const Pagination = (props) => {
  const { onChangePage, total, limit, page } = props;
  const pages = Math.ceil(total / limit);
  if (pages === 0) return <div className="text-center">No content</div>;
  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChangePage(page - 1)}>
            Previous
          </button>
        </li>
        {Array.from({ length: pages }, (_, i) => i + 1).map((item) => {
          if (Math.abs(page - item) === 3)
            return (
              <li className={`page-item disabled`} key={item}>
                <button className={"page-link"}>...</button>
              </li>
            );
          if (Math.abs(page - item) > 3) return null;
          return (
            <li className={`page-item ${item === page ? "active" : ""}`} key={item}>
              <button className={"page-link"} onClick={() => onChangePage(item)}>
                {item}
              </button>
            </li>
          );
        })}
        <li className={`page-item ${page === pages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onChangePage(page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
