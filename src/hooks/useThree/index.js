import { useRef, useEffect, useCallback, useState, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { useCamera } from "./useCamera";
import { useScence } from "./useScence";
import { useMesh } from "./useMesh";
import { useLight } from "./useLight";
import { useRender } from "./useRender";
import { useController } from "./useController";

export const useThree = () => {
  const page = useRef(); // useRef不会导致重新渲染
  /**
   * 场景、相机、渲染器作为threejs的基本结构，需要在页面进入时渲染完毕
   */
  const scence = useRef(new THREE.Scene()).current; //场景
  const camera = useRef(new THREE.PerspectiveCamera()).current; //摄像机（透视投影）
  const render = useRef(new THREE.WebGLRenderer()).current; //渲染器

  const timer = useRef(null); // 定时器

  const controls = useMemo(() => {
    return new OrbitControls(camera, render.domElement);
  }, []); //创建控件对象

  console.log(112233);

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  // 加载模型
  const { initMesh, meshList, activeMesh, setActiveMesh } = useMesh({
    scence,
    forceUpdate,
  });

  // 加载 场景
  const { initScence, setScence } = useScence({ render, scence, camera, page });

  // 加载 相机
  const { initCamera } = useCamera({ page, render, camera, scence });

  // 加载 光源
  const { initLight } = useLight({ scence });

  // 启动 渲染器
  const { renderScene } = useRender({
    meshList,
    scence,
    timer,
    controls,
    camera,
    render,
  });

  // 控制器
  useController({ meshList, camera, scence, setActiveMesh, page });

  useEffect(() => {
    // controls.current.rotateSpeed = 0.05;
    // controls.current.zoomSpeed = 0.05;
    console.log(render);
    page.current.appendChild(render.domElement);
    initScence();
    initCamera();
    initLight();
    initMesh();
    renderScene();
    console.log("创建 webgl");
    return () => {
      console.log("卸载 webgl");
      // 销毁定时器
      cancelAnimationFrame(timer.current);
      // 销毁材质、几何体、渲染器、场景
      meshList.forEach((item) => {
        scence.remove(item);
        item.material.dispose();
        item.geometry.dispose();
      });
    };
  }, []);

  return {
    page,
    scence,
    setScence,
    meshList,
    activeMesh,
  };
};
