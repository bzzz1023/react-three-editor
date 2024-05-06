import {
  useState,
  useRef,
  useEffect,
  useMemo,
  Suspense,
  memo,
  useCallback,
  forwardRef,
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

const App = ({ sceneRef, sceneData }) => {
  const { scene } = useThree();

  useEffect(() => {
    scene.userData = { ...sceneData };

    const { background } = scene.userData;
    scene.background = new THREE.Color(background);

    sceneRef.current = scene;
  }, []);
};

export default memo(App);
