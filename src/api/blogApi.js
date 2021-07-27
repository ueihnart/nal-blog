import axiosClient from "./axiosClient";

const url = "/blog";

const blogApi = {
  index: (params) => axiosClient.get(url, { params: params }),
  get: (id) => axiosClient.get(`${url}/${id}`),
};

export default blogApi;
