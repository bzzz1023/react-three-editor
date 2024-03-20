import { useRef, useEffect, useCallback, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import _ from "lodash";

export const useMesh = ({ scence, forceUpdate }) => {
  const meshList = useRef([]).current;
  const [activeMesh, setActiveMesh] = useState(null);

  const initMesh = useCallback(() => {
    /**
     * 创建地板
     */
    const planeGeometry = new THREE.PlaneGeometry(60, 20); // 创建平面几何体
    const planeMaterial = new THREE.MeshLambertMaterial({
      // 一种非光泽表面的材质，没有镜面高光
      color: 0xaaaaaa,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial); // 创建地板模型
    plane.rotation.x = -0.5 * Math.PI; // 默认平行于xoy面，沿着X轴旋转-90°至xoz面
    plane.receiveShadow = true;
    scence.add(plane); // 向场景中添加创建的地板

    /**
     * 创建球体
     */
    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20); // 球状几何体
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); // 向场景中添加创建的球模型
    sphere.name = `sphere.${sphere.uuid.substring(0, 5)}`;
    sphere.castShadow = true; // 允许接受阴影
    sphere.position.set(20, 4, 2); // 球模型在坐标系中位置
    scence.add(sphere); // 向场景中添加光源

    /**
     * 创建立方体
     */
    const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: "blue" });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.name = `cube.${cube.uuid.substring(0, 5)}`;
    cube.castShadow = true;
    cube.position.set(-20, 2.5, 0);
    scence.add(cube);
    meshList.push(sphere);
    meshList.push(cube);
    forceUpdate();
  }, [scence]);

  return {
    initMesh,
    meshList,
    activeMesh,
    setActiveMesh,
  };
};
