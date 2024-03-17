import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

export const useCamera = ({ page, render, camera, scence }) => {

  const initCamera = useCallback(() => {

    // 设置摄像机的属性
    camera.aspect = page.current.offsetWidth / page.current.offsetHeight; // 摄像机设置屏幕宽高比
    camera.fov = 45; // 摄像机的视角
    camera.near = 0.01; // 近面距离
    camera.far = 1001; // 远面距离
    camera.position.set(30, 40, 30); // 设置摄像机在threejs坐标系中的位置
    camera.lookAt(0, 0, 0); // 摄像机的指向
    camera.updateProjectionMatrix(); // 更新摄像机投影矩阵,在任何参数被改变以后必须被调用
  }, [render, scence]);

  const setCamera = () => {};

  return {
    initCamera
  }
};
