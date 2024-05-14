import fireIcon from "./assets/fire.jpg";
import oceanIcon from "./assets/ocean.jpg";
import rectIcon from "./assets/rect.jpg";
import treeIcon from "./assets/tree.jpg";
import lightIcon from "./assets/light.png";
export const baseModelList = [
  {
    label: "火",
    imageUrl: fireIcon,
    config: {
      modelType: 2,
      modelKey: "fire",
      userData: {
        modelName: "火焰",
        color: "green",
        scale: 8,
      },
    },
  },
  {
    label: "海洋",
    imageUrl: oceanIcon,
    config: {
      modelType: 2,
      modelKey: "ocean",
      userData: {
        modelName: "海洋",
      },
    },
  },
  {
    label: "树木",
    imageUrl: treeIcon,
    config: {
      modelType: 2,
      modelKey: "tree",
      userData: {
        modelName: "树木",
        scale: { x: 0.1, y: 0.1, z: 0.1 },
      },
    },
  },
  {
    label: "方体",
    imageUrl: rectIcon,
    config: {
      modelType: 2,
      modelKey: "cube",
      userData: {
        modelName: "方体",
      },
    },
  },
];

export const lightList = [
  {
    label: "平行灯",
    imageUrl: lightIcon,
    config: {
      modelType: 3,
      modelKey: "light",
      userData: {
        modelName: "平行灯",
        lightKey: "directionalLight",
      },
    },
  },
  {
    label: "环境光",
    imageUrl: lightIcon,
    config: {
      modelType: 3,
      modelKey: "light",
      userData: {
        modelName: "环境光",
        lightKey: "ambientLight",
      },
    },
  },
  {
    label: "聚光灯",
    imageUrl: lightIcon,
    config: {
      modelType: 3,
      modelKey: "light",
      userData: {
        modelName: "聚光灯",
        lightKey: "spotLight",
      },
    },
  },
  {
    label: "点光源",
    imageUrl: lightIcon,
    config: {
      modelType: 3,
      modelKey: "light",
      userData: {
        modelName: "点光源",
        lightKey: "pointLight",
      },
    },
  },
];
