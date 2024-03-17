import axios from "axios";

const prod_url = `https://www.draw.wang`;
const dev_url = `http://127.0.0.1:7001`;

const UrlPrefix = process.env.NODE_ENV === "development" ? dev_url : prod_url;
const service = axios.create({
  baseURL: UrlPrefix,
  timeout: 50000, // 请求超时时间
});

service.interceptors.request.use(
  (config) => {
    // const authorization = localStorage.getItem(User_Access_Token)
    // config.headers["authorization"] = authorization;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      return Promise.reject(response);
    }
    /* 对blob下载特殊处理 */
    if (response.config.responseType === "blob") {
      return response;
    }

    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const http = {
  get(url, data) {
    return new Promise((resolve, reject) => {
      service
        .get(url, {
          params: data,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post(url, data, config = {}) {
    return new Promise((resolve, reject) => {
      service
        .post(url, data, config)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default http;
