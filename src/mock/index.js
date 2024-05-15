import { AnimationDataMap } from "@/constant";

export const operationData = {
  showGridHelper: false,
  showAxesHelper: false,
};

export const sceneData = {
  background: `#ffffff`,
};

export const cameraData = {
  autoRotate: false,
  position: [5, 5, 5],
  rotateSpeed: 10,
  rotateDirection: 1,
};

/*
  modelType 
  1 - 自定义模型 
  2 - 现有模型
  3 - 灯光模型
*/

export const modelData = [
  {
    id: 1,
    modelType: 1,
    // url: "http://127.0.0.1:7001/v1/model/camera.glb",
    url: `/assets/model/coolcar.glb`,
    userData: {
      modelType: 1,
      modelName: "汽车",
      position: { x: 1, y: 0, z: 1 },
      rotation: { x: 0, y: 180, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      animationType: 0,
      animationData: { ...AnimationDataMap },
    },
  },
  {
    id: 2,
    modelType: 1,
    url: `/assets/model/soldier.glb`,
    userData: {
      modelType: 1,
      modelName: "士兵",
      position: { x: 0, y: 0, z: 0 },
      animationType: 0,
      animationData: { ...AnimationDataMap },
    },
  },
];
