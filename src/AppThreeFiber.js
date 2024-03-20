import ReactDOM from "react-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import "./app.scss";
import {
  OrbitControls,
  TransformControls,
  useCursor,
  useGLTF,
} from "@react-three/drei";
import { useState, useEffect, Suspense, useRef } from "react";
import { Leva, useControls } from "leva";
import create from "zustand";

function App() {
  const [activeMesh, setActiveMesh] = useState(null);
  const myMesh = useRef();
  const myMesh1 = useRef();

  const { mode, set, get } = useControls({
    mode: { value: "translate", options: ["translate", "rotate", "scale"] },
    range: {
      max: 10,
      min: 0,
      step: 1,
      value: 4,
    },
  });

  // useFrame(({ clock }) => {
  //   const a = clock.getElapsedTime();
  //   myMesh.current.rotation.x = a;
  // });

  useEffect(() => {
  }, [activeMesh]);

  // const { nodes } = useGLTF("http://127.0.0.1:7001/v1/model/camera.glb");
  // console.log(1133, nodes);

  return (
    <div className="out-page-container">
      <div className="aass">
        <Leva
          fill // 占满容器
          flat // 扁平化
          hideCopyButton //隐藏复制按钮
          neverHide // 不被隐藏
          titleBar={{ drag: false, title: "示例面板" }}
        />
      </div>
      <div id="canvas-container" className="main-three-editor-container">
        <Canvas
          dpr={[1, 2]}
          onPointerMissed={() => {
            setActiveMesh(null);
          }}
        >
          <mesh
            position={[0, 0, 0]}
            onClick={(e) => {
              console.log(e);
              setActiveMesh(e.object);
            }}
          >
            <boxGeometry />
            <meshStandardMaterial color="royalblue" />
          </mesh>

          <mesh
            position={[1, 1, 1]}
            onClick={(e) => {
              setActiveMesh(e.object);
            }}
          >
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>

          {/* <>
            {Object.keys(nodes).map((key, index) => {
              console.log(nodes[key].position);
              return (
                <mesh
                  onClick={(e) => {
                    console.log(e);
                    setActiveMesh(e);
                  }}
                  key={key}
                  geometry={nodes[key].geometry}
                  material={nodes[key].material}
                  name={nodes[key]}
                  position={nodes[key].position}
                ></mesh>
              );
            })}
          </> */}
          {/* <mesh>
            geometry={nodes[name].geometry}
            material={nodes[name].material}
          </mesh> */}

          {activeMesh && <TransformControls object={activeMesh} mode={mode} />}

          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
