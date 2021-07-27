import React from "react";

export const Loader = () => {
  return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" style={{ width: "50px", height: "50px", marginTop: "50px" }} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
