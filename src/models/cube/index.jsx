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

  // directionalLight
  // ambientLight
  // spotLight
  // pointLight

  return (
    <Suspense>
      <mesh
        ref={ref}
        geometry={new BoxGeometry()}
        dispose={null}
        onDoubleClick={(e) => {
          e.stopPropagation()
          setTarget(ref.current);
        }}
      >
        <meshStandardMaterial color={"#FFB6C1"} />
      </mesh>
    </Suspense>
  );
};

export default App;
