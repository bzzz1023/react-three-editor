import { extend, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, Suspense } from "react";

const App = ({ userData, setTarget, index, modelListRef }) => {
  const ref = useRef();

  useFrame((state) => {});
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
        dispose={null}
        onClick={(e) => {
          setTarget(e.eventObject);
        }}
      >
        <boxGeometry />
      </mesh>
    </Suspense>
  );
};

export default App;
