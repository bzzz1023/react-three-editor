import http from "../http";

export const UploadModelApi = async (modelName) => {
  return http.get(`/v1/model/${modelName}`);
};
