import axiosClient from "./axiosClient";

const url = "/blogs";

const blogApi = {
  index: (params) => axiosClient.get(url, { params: params }),
  get: (id) => axiosClient.get(`${url}/${id}`),
};

export default blogApi;
