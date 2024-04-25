import Fire from "@/models/fire";
import Ocean from "@/models/ocean";
import Tree from "@/models/tree";
import Cube from "@/models/cube";

export const ModelAssetMap = {
  fire: Fire,
  ocean: Ocean,
  tree: Tree,
  cube: Cube,
};

export const AnimationDataMap = {
  // 旋转
  1: {
    enableRotateSelf: true,
    rotatePivot: { x: 0, y: 0, z: 0 },
    rotateRadius: 2,
    rotateClockwise: -1,
    rotateSpeed: 1,
  },
  // 循环往复移动
  2: {
    moveDirection: ["x"],
    moveRange: 2,
    moveSpeed: 10,
  },
};

export const cameraData = {
  autoRotate: false,
  position: [5, 5, 5],
  rotateSpeed: 10,
  rotateDirection: 1,
  movePosition: {
    enable: false,
    targetPosition: null,
  },
};

/*
  modelType 1 - 自定义模型 ，2 - 现有模型

*/

export const meshData = [
  {
    id: 1,
    modelType: 1,
    // url: "http://127.0.0.1:7001/v1/model/camera.glb",
    url: `/assets/model/coolcar.glb`,
    userData: {
      modelType: 1,
      modelName: "照相机",
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
