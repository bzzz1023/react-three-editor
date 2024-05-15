import { sceneData, cameraData,modelData,operationData } from "@/mock";

export const GetCanvasDataApi = async () => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        code: 200,
        data: {
          operationData,
          sceneData,
          cameraData,
          modelData
        },
      });
    }, 400);
  });
};
