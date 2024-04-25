import {
  useState,
  useRef,
  useEffect,
  useMemo,
  Suspense,
  memo,
  useCallback,
  useLayoutEffect,
  useDeferredValue,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Clone } from "@react-three/drei";
import initSetModelProperty from "@/utils/model/initSetModelProperty.js";
import modelAnimationExecute from "@/utils/modelAnimation/index.js";


const App = ({ userData, setTarget, index, modelListRef }) => {
  const ref = useRef();

  const url = `/assets/model/tree.gltf`;
  const { scene } = useGLTF(url);

  useFrame((state, delta) => {
    if (ref.current) {
      modelAnimationExecute({ ref, state, delta });
    }
  });

  useEffect(() => {
    ref.current.userData = {
      ...ref.current.userData,
      ...userData,
    };
    modelListRef.current[index].mesh = { scene: ref.current };
    initSetModelProperty({ ref });

  }, []);

  return (
    <Suspense>
      <Clone
        ref={ref}
        dispose={null}
        object={scene}
        onClick={(e) => {
          setTarget(e.eventObject);
        }}
      />
    </Suspense>
  );
};

export default App;
