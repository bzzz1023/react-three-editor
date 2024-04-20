import http from "../http";

export const UploadModelApi = async (modelName) => {
  return http.get(`/v1/model/${modelName}`);
};

export const GetJson = async()=>{
  // return new Promise((i))
}
