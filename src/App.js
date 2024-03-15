import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { useRender } from "@/hooks/useThree";

const App = () => {
  const page = useRef(); // useRef不会导致重新渲染
  /**
   * 场景、相机、渲染器作为threejs的基本结构，需要在页面进入时渲染完毕
   */
  const scence = useRef(new THREE.Scene()).current; //场景
  const camera = useRef(new THREE.PerspectiveCamera()).current; //摄像机（透视投影）
  const render = useRef(new THREE.WebGLRenderer()).current; //渲染器

  const meshList = useRef([]).current; // 模型容器

  const timer = useRef(null); // 定时器

  const controls = new OrbitControls(camera, render.domElement); //创建控件对象

  let step = 0;

  /**
   * 自适应浏览器窗口大小
   */
  const reszie = () => {
    //innerHeight 返回窗口的文档显示区的高度，如果有垂直滚动条，也包括滚动条高度
    //innerWidth 返回窗口的文档显示区的宽度，如果有水平滚动条，也包括滚动条高度
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", reszie, false);

  // 初始化场景
  const init = useCallback(() => {
    render.setSize(page.current.offsetWidth, page.current.offsetHeight); // 渲染器设置尺寸
    // 设置背景颜色
    render.setClearColor(new THREE.Color(0xccd3ca)); // 设置背景颜色和透明度
    render.shadowMap.enabled = true; // 渲染器允许渲染阴影⭐

    // 添加坐标轴
    // 红色代表 X 轴;绿色代表 Y 轴;蓝色代表 Z 轴
    const axes = new THREE.AxesHelper(20);
    scence.add(axes);

    /**
     * 设置摄像机的属性
     */
    camera.aspect = page.current.offsetWidth / page.current.offsetHeight; // 摄像机设置屏幕宽高比
    camera.fov = 45; // 摄像机的视角
    camera.near = 0.01; // 近面距离
    camera.far = 1001; // 远面距离
    camera.position.set(30, 40, 30); // 设置摄像机在threejs坐标系中的位置
    camera.lookAt(0, 0, 0); // 摄像机的指向
    camera.updateProjectionMatrix(); // 更新摄像机投影矩阵,在任何参数被改变以后必须被调用
  }, [render, scence]);

  // 初始化环境光
  const initLight = () => {
    const ambLight = new THREE.AmbientLight("#ffffff", 0.3); // 基本光源

    /**
     * 设置聚光灯相关的的属性
     */
    const spotLight = new THREE.SpotLight(0xffffff); // 聚光灯
    spotLight.position.set(50, 80, 15);
    spotLight.castShadow = true; // 只有该属性为true时，该点光源允许产生阴影，并且下列属性可用
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scence.add(ambLight, spotLight); // 向场景中添加光源
  };

  // 初始化模型
  const initMesh = () => {
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
    sphere.castShadow = true; // 允许接受阴影
    sphere.position.set(20, 4, 2); // 球模型在坐标系中位置
    scence.add(sphere); // 向场景中添加光源

    /**
     * 创建立方体
     */
    const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: "blue" });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.set(-20, 2.5, 0);
    scence.add(cube);

    meshList.push(sphere, cube); // 将球体、立方体加入容器
  };

  const cubrRoatetSpeed = 0.03;
  const sphereRotateSpeed = 0.03;

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

  useEffect(() => {
    page.current.appendChild(render.domElement);
    init();
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

  return (
    <div className="main">
      <div className="page" ref={page}></div>
      <div className="controller">
        <button
          onClick={() => {
            render.setClearColor(new THREE.Color(0x00000)); // 设置背景颜色和透明度
          }}
        >
          修改背景
        </button>
      </div>
    </div>
  );
};

export default App;
