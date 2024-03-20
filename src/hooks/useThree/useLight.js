import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

export const useLight = ({ scence }) => {
  const initLight = useCallback(() => {
    const ambLight = new THREE.AmbientLight("#ffffff", 0.3); // 基本光源

    /**
     * 设置聚光灯相关的的属性
     */
    const spotLight = new THREE.SpotLight(0xffffff); // 聚光灯
    spotLight.position.set(50, 80, 15);
    spotLight.castShadow = true; // 只有该属性为true时，该点光源允许产生阴影，并且下列属性可用
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scence.add(ambLight, spotLight); // 向场景中添加光源
  }, [scence]);

  return { initLight };
};
