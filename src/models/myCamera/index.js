import {
  useState,
  useRef,
  useEffect,
  useMemo,
  Suspense,
  memo,
  useCallback,
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

const MyCamera = memo(({ cameraRef }) => {
  const { camera } = useThree();

  useEffect(() => {
    cameraRef.current = camera;
  }, []);
});

export default MyCamera;

// Tips 相机 自动旋转 鼠标控制

/*
useFrame((state, delta) => {
    const { rotateSpeed, rotateDirection, autoRotate } =
      cameraRef.current?.userData;
    const { x, y, z } = camera.position;
    const { clock } = state;
    if (autoRotate) {
      const rotateAngleOffset = delta / rotateSpeed;

      const newX =
        x +
        rotateDirection *
          (x * (Math.cos(rotateAngleOffset) - 1) -
            z * Math.sin(rotateAngleOffset));

      const newZ =
        z +
        rotateDirection *
          (x * Math.sin(rotateAngleOffset) +
            z * (Math.cos(rotateAngleOffset) - 1));

      camera.position.set(newX, y, newZ);

      ====== 下面这个方法不行，tips：必须得是值的增量
      const step = clock.getElapsedTime();
      const deg = (Math.PI / 180) * step * 10;
      const d = originPoint.distanceTo(camera.position);
      const r = Math.sqrt(d * d - y * y);
      const newX1 = r * Math.cos(deg);
      const newZ1 = r * Math.sin(deg);
    }
  });


*/
