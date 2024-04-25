import { extend, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, Suspense } from "react";
import modelAnimationExecute from "@/utils/modelAnimation/index.js";
import {
  SphereGeometry,
  PlaneGeometry,
  BoxGeometry,
  CylinderGeometry,
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

  return (
    <Suspense>
      <mesh
        ref={ref}
        geometry={new BoxGeometry()}
        dispose={null}
        onClick={(e) => {
          setTarget(ref.current);
        }}
      >
        <meshStandardMaterial color={"#FFB6C1"} />
      </mesh>
    </Suspense>
  );
};

export default App;
