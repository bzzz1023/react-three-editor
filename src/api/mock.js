import { sceneData, cameraData,modelData } from "@/mock";

export const GetCanvasDataApi = async () => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        code: 200,
        data: {
          sceneData,
          cameraData,
          modelData
        },
      });
    }, 400);
  });
};
