import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

export const useRender = ({
  meshList,
  scence,
  timer,
  controls,
  camera,
  render,
}) => {
  const cubrRoatetSpeed = 0.01;
  const sphereRotateSpeed = 0.01;
  let step = 0;
  // 渲染器执行渲染
  const renderScene = useCallback(() => {
    // 球体添加弹跳效果
    step += sphereRotateSpeed;

    meshList[0].position.x = 20 + 10 * Math.cos(step); //水平方向为余弦曲线
    meshList[0].position.y = 4 + 10 * Math.abs(Math.sin(step)); // 竖直方向为正弦曲线

    // 立方体添加旋转效果
    meshList[1].rotation.x += cubrRoatetSpeed;
    meshList[1].rotation.y += cubrRoatetSpeed;
    meshList[1].rotation.z += cubrRoatetSpeed;

    controls.update(); // 鼠标交互更新
    timer.current = window.requestAnimationFrame(() => renderScene()); // 启动动画，见interactive.md

    render.render(scence, camera);
  }, [render]);

  return {
    renderScene,
  };
};
