import {
  useState,
  useRef,
  useEffect,
  useMemo,
  Suspense,
  memo,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  useCursor,
  useGLTF,
  Stats,
  PerspectiveCamera,
  useAnimations,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Leva, useControls } from "leva";
import BottomControllerPanel from "@/components/BottomControllerPanel";
import LeftControllerPanel from "@/components/LeftControllerPanel";
import * as THREE from "three";

const meshArray = [
  {
    url:"http://127.0.0.1:7001/v1/model/camera.glb",
    // url: `/assets/model/camera.glb`,
    userData: {
      rotateSpeed: 1,
    },
  },
  {
    url: `/assets/model/soldier.glb`,
    userData: {
      rotateSpeed: 8,
    },
  },
];

const MyModel = memo(({ url, userData, setMeshCache, setActiveMesh }) => {
  const { scene, animations } = useGLTF(url);
  console.log(1122);
  const ref = useRef();

  useFrame(({ clock }) => {
    const step = clock.getElapsedTime();
    const { rotateSpeed } = ref.current.userData;
    if (rotateSpeed) {
      ref.current.rotation.y = step * 0.1 * rotateSpeed;
    }
  });

  useEffect(() => {
    ref.current.userData = { ...userData };
    setMeshCache((preState) => {
      return [...preState, ref.current];
    });
  }, [ref.current]);

  return (
    <Suspense>
      <group
        ref={ref}
        dispose={null}
        onClick={(e) => {
          setActiveMesh(e.object);
        }}
      >
        <primitive object={scene} />
      </group>
    </Suspense>
  );
});

function MyCameraReactsToStateChanges({}) {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    // const step = clock.getElapsedTime();
  });

  useEffect(() => {
    // cameraRef.current = camera;
  }, []);
}

function App() {
  const meshList = useRef(meshArray);

  const [meshCache, setMeshCache] = useState([]);

  const [activeMesh, setActiveMesh] = useState(null);

  return (
    <div className="out-page-container">
      <LeftControllerPanel
        meshCache={meshCache}
        setActiveMesh={setActiveMesh}
      />

      {/* <BottomControllerPanel
        selectMesh={selectMesh}
        changeAnimationState={changeAnimationState}
      /> */}
      <div className="main-three-editor-container">
        <Canvas
          dpr={[1, 2]}
          onPointerMissed={() => {
            setActiveMesh(null);
          }}
        >
          {meshList.current.length > 0 &&
            meshList.current.map((item, index) => {
              return (
                <MyModel
                  key={index}
                  {...item}
                  setMeshCache={setMeshCache}
                  setActiveMesh={setActiveMesh}
                />
              );
            })}
          <directionalLight color="white" position={[0, 0, 3]} />
          <directionalLight color="white" position={[3, 0, 0]} />
          <directionalLight color="white" position={[0, 1, 0]} />
          <directionalLight color="white" position={[0, -3, 0]} />
          <MyCameraReactsToStateChanges />
          <gridHelper size={10} divisions={10} />
          {activeMesh && (
            <TransformControls object={activeMesh} mode={"translate"} />
          )}
          <OrbitControls makeDefault />
          <Stats className="aaww" />
        </Canvas>
      </div>
    </div>
  );
}

export default memo(App);
