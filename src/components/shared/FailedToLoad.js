export const FailedToLoad = ({ error }) => {
  let message = `Error : ${error} `;

  return (
    <div className="text-center py-5">
      <div style={{ fontSize: "70px" }}>
        <i className="bi bi-exclamation-triangle text-danger"></i>
      </div>
      <div className="text-danger my-3">
        <code className="border-bottom">{message}</code>
      </div>
      <button className="btn btn-primary" onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  );
};
