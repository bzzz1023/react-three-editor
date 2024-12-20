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
    rotateSpeed: 8,
  },
  // 循环往复移动
  2: {
    moveDirection: ["x"],
    moveRange: 2,
    moveSpeed: 6,
  },
};

// 光源基础参数
export const LightBaseConfig = {
  intensity: 1,
  color: "#ffffff",
  distance: 0,
  angle: 0.5,
};
