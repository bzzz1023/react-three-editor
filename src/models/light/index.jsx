import { extend, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, Suspense } from "react";
import modelAnimationExecute from "@/utils/modelAnimation/index.js";
import {
  SphereGeometry,
  PlaneGeometry,
  BoxGeometry,
  CylinderGeometry,
  ConeGeometry,
} from "three";

const lightMap = {
  directionalLight: (
    <directionalLight color="white" position={[0, 0, 0]} intensity={100} />
  ),
  ambientLight: (
    <ambientLight color="white" position={[0, 0, 0]} intensity={100} />
  ),
  spotLight: <spotLight color="white" position={[0, 0, 0]} intensity={100} />,
  pointLight: <pointLight color="white" position={[0, 0, 0]} intensity={100} />,
};

const App = ({ userData, setTarget, index, modelListRef }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      modelAnimationExecute({ ref, state, delta });
    }
  });
  useEffect(() => {
    // 保存模型ref
    ref.current.userData = {
      ...ref.current.userData,
      ...userData,
    };
    modelListRef.current[index].mesh = { scene: ref.current };
  }, []);

  useEffect(() => {
    console.log("light===", ref.current);
  }, []);

  return (
    <Suspense>
      <mesh
        ref={ref}
        geometry={new ConeGeometry(1, 2, 32)}
        dispose={null}
        onClick={(e) => {
          setTarget(ref.current);
        }}
      >
        <meshStandardMaterial wireframe />
        {lightMap[userData.lightKey]}
        {/* <pointLight color="white" position={[0, 0, 0]} intensity={100} /> */}
      </mesh>
    </Suspense>
  );
};

export default App;
