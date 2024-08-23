import { extend, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, Suspense, memo } from "react";
import modelAnimationExecute from "@/utils/modelAnimation/index.js";
import { AmbientLight } from "three";
import { useHelper } from "@react-three/drei";

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
    console.log("AmbientLight===", ref.current);
  }, []);

  // useHelper(ref, AmbientLight);

  return (
    <ambientLight
      ref={ref}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setTarget(ref.current);
      }}
    />
  );
};

export default memo(App);
