import React from "react";
import { STATUS_DATA } from "../../constant";
import { FailedToLoad } from "./FailedToLoad";
import { Loader } from "./Loader";

export const LoadContent = (props) => {
  const { status, error, children } = props;
  switch (status) {
    case STATUS_DATA.FAILURE:
      return <FailedToLoad error={error?.response.statusText} />;
    default:
      return (
        <>
          {status === STATUS_DATA.REQUEST && <Loader />}
          {children}
        </>
      );
  }
};
