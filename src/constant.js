export const STATUS_DATA = {
  IDE: "IDLE",
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};
export const INIT_STATE = {
  blogs: {
    status: STATUS_DATA.IDE,
    error: null,
    data: [],
  },
  blog: {
    status: STATUS_DATA.IDE,
    error: null,
    data: {},
  },
};
