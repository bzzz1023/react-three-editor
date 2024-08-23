import waterImg from "./waternormals.jpeg";
import * as THREE from "three";
import React, { Suspense, useRef, useMemo, useEffect } from "react";
import {
  Canvas,
  extend,
  useThree,
  useLoader,
  useFrame,
} from "@react-three/fiber";

import { Sky } from "@react-three/drei";

import { Water } from "three-stdlib";

extend({ Water });
function Ocean({ userData, setTarget, index, modelListRef }) {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, waterImg);
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );
  useFrame(
    (state, delta) => (ref.current.material.uniforms.time.value += delta)
  );

  useEffect(() => {
    ref.current.userData = {
      ...ref.current.userData,
      ...userData,
    };
    modelListRef.current[index].mesh = { scene: ref.current };
  }, []);

  return (
    <mesh>
      <water
        ref={ref}
        args={[geom, config]}
        rotation-x={-Math.PI / 2}
        onDoubleClick={(e) => {
          // console.log(2233,setTarget);
          // console.log(1122,e.object);
          setTarget(e.object);
        }}
      />
      <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
    </mesh>
  );
}

export default Ocean;
