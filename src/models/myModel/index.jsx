import {
  useState,
  useRef,
  useEffect,
  useMemo,
  Suspense,
  memo,
  useCallback,
  useLayoutEffect,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  useCursor,
  useGLTF,
  Stats,
  PerspectiveCamera,
  useAnimations,
  CameraShake,
  Sky,
} from "@react-three/drei";
import useStore from "@/store";

import animationFunc from "./utils";

import initSetModelProperty from '@/utils/initSetModelProperty.js'
import modelAnimationExecute from '@/utils/modelAnimation/index.js'

export default memo(({ url, userData, setTarget, index, modelListRef }) => {
  const ref = useRef();
  // 加载模型
  const mesh = useGLTF(url);

  console.log("渲染 my model ~");

  useFrame((state, delta) => {
    // const { clock } = state;
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
    modelListRef.current[index].mesh = mesh;

    // TODO 初始化所有参数
    initSetModelProperty({ ref });
  }, []);

  return (
    <Suspense>
      <primitive
        ref={ref}
        dispose={null}
        object={mesh.scene}
        onClick={(e) => {
          setTarget(e.eventObject);
        }}
      />
    </Suspense>
  );
});
