import { extend, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, Suspense, memo } from "react";
import modelAnimationExecute from "@/utils/modelAnimation/index.js";
import {
  SphereGeometry,
  PlaneGeometry,
  BoxGeometry,
  CylinderGeometry,
  ConeGeometry,
  SpotLightHelper,
} from "three";
import { useHelper } from "@react-three/drei";

import MyAmbientLight from "./ambientLight";
import MyDirectionalLight from "./directionalLight";
import MyPointLight from "./pointLight";
import MySpotLight from "./spotLight";

import MyLight from "./myLight";

const App = ({ userData, setTarget, index, modelListRef }) => {


  return (
    <MyLight
      userData={userData}
      setTarget={setTarget}
      index={index}
      modelListRef={modelListRef}
    />
  );
};

export default memo(App);
