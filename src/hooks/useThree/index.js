import { useRef, useEffect, useCallback, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { useCamera } from "./useCamera";
import { useScence } from "./useScence";
import { useMesh } from "./useMesh";
import { useLight } from "./useLight";
import { useRender } from "./useRender";
import { useController } from "./useController";

export const useThree = () => {
  // 强制更新渲染
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const page = useRef(); // useRef不会导致重新渲染
  /**
   * 场景、相机、渲染器作为threejs的基本结构，需要在页面进入时渲染完毕
   */
  const scence = useRef(new THREE.Scene()).current; //场景
  const camera = useRef(new THREE.PerspectiveCamera()).current; //摄像机（透视投影）
  const render = useRef(new THREE.WebGLRenderer()).current; //渲染器

  const timer = useRef(null); // 定时器

  const controls = new OrbitControls(camera, render.domElement); //创建控件对象

  // 加载 场景
  const { initScence, setScence } = useScence({ render, scence, camera, page });

  // 加载 相机
  const { initCamera } = useCamera({ page, render, camera, scence });

  // 加载 光源
  const { initLight } = useLight({ scence });

  // 加载模型
  const { meshList, initMesh, loadMesh } = useMesh({ scence, forceUpdate });

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
  useController({ meshList });

  useEffect(() => {
    page.current.appendChild(render.domElement);
    initScence();
    initCamera();
    initLight();
    initMesh();
    renderScene();
    return () => {
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
    loadMesh,
    
  };
};
