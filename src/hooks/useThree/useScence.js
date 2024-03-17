import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

export const useScence = ({ render, scence, camera, page }) => {
  const reszie = () => {
    //innerHeight 返回窗口的文档显示区的高度，如果有垂直滚动条，也包括滚动条高度
    //innerWidth 返回窗口的文档显示区的宽度，如果有水平滚动条，也包括滚动条高度
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render.setSize(window.innerWidth, window.innerHeight);
  };

  const initScence = useCallback(() => {
    render.setSize(page.current.offsetWidth, page.current.offsetHeight); // 渲染器设置尺寸
    // 设置背景颜色
    render.setClearColor(new THREE.Color(0xccd3ca)); // 设置背景颜色和透明度
    render.shadowMap.enabled = true; // 渲染器允许渲染阴影⭐

    // 添加坐标轴
    // 红色代表 X 轴;绿色代表 Y 轴;蓝色代表 Z 轴
    const axes = new THREE.AxesHelper(10);
    scence.add(axes);

    window.addEventListener("resize", reszie, false);
  }, [render, scence]);

  const setScence = useCallback(
    (color) => {
      render.setClearColor(new THREE.Color("green"));
    },
    [render, scence]
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("resize", reszie);
    };
  });

  return { initScence, setScence };
};
