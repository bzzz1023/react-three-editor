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

const App = ({ sceneRef}) => {
  const { scene } = useThree();

  useEffect(() => {
    sceneRef.current = scene;
  }, []);
};

export default memo(App);
