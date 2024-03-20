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
  useAnimations,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Leva, useControls } from "leva";
import LeftControllerPanel from "@/components/LeftControllerPanel";

const array = [
  {
    url: "http://127.0.0.1:7001/v1/model/camera.glb",
  },
  {
    url: "http://127.0.0.1:7001/v1/model/soldier.glb",
  },
];

const AModel = memo(({ url, setActiveMesh, index, setMeshList }) => {
  console.log('组件渲染===',index);
  const res = useGLTF(url);
  setMeshList((preState) => {
    preState[index] = res;
    return preState;
  });

  const objectRef = useRef();
  objectRef.current = res;
  const { scene, animations } = objectRef.current;

  const ref = useRef();

  useFrame(({ clock }) => {
    // const step = clock.getElapsedTime();
    // ref.current.rotation.y = step * 0.1;
  });

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const click = useCallback((e) => {
    setActiveMesh(e.object);
  }, []);

  return (
    <Suspense>
      <group
        ref={ref}
        onClick={(e) => {
          click(e);
        }}
        onPointerOver={(e) => setHovered(true)}
        onPointerOut={(e) => setHovered(false)}
        dispose={null}
        position={[1, 1, 1]}
      >
        <primitive object={scene} />
      </group>
    </Suspense>
  );
});

export default function App() {
  const [activeMesh, setActiveMesh] = useState(null);

  const [meshList, setMeshList] = useState(array);

  const [{ mode, position }, set] = useControls(() => {
    return {
      mode: {
        label: "transform",
        value: "translate",
        options: ["translate", "rotate", "scale"],
      },
      position: {
        label: "position",
        value: { x: 0, y: 0, z: 0 },
        onChange: (v) => {
          // console.log(v);
          if (activeMesh) {
            activeMesh.position.x = v.x;
          }
        },
      },
    };
  });

  // useEffect(() => {
  //   // console.log(activeMesh);
  //   activeMesh &&
  //     (() => {
  //       console.log(typeof activeMesh.position);
  //       const { x, y, z } = activeMesh.position;
  //       set({ position: { x, y, z } });
  //     })();
  // }, [activeMesh]);

  return (
    <div className="out-page-container">
      <div className="right-controller-panel">
        <Leva
          fill // 占满容器
          flat // 扁平化
          hideCopyButton //隐藏复制按钮
          hidden={!activeMesh} // 不被隐藏
          titleBar={{ drag: false, title: "示例面板" }}
        />
      </div>
      <LeftControllerPanel meshList={meshList} />
      <div className="main-three-editor-container">
        <Canvas
          dpr={[1, 2]}
          onPointerMissed={() => setActiveMesh(null)}
          camera={{ position: [3, 3, 3] }}
        >
          <EffectComposer>
            <Bloom luminanceThreshold={1} mipmapBlur />
          </EffectComposer>
          {meshList.length > 0 &&
            meshList.map((item, index) => {
              return (
                <AModel
                  key={index}
                  index={index}
                  url={item.url}
                  setActiveMesh={setActiveMesh}
                  setMeshList={setMeshList}
                />
              );
            })}

          {/* <AModel url={`/assets/soldier.glb`} setActiveMesh={setActiveMesh} /> */}
          {/* <GroupModel nodes={nodes} setActiveMesh={setActiveMesh} /> */}
          {/* <Box
              position={[2, 2, 0]}
              setHovered={setHovered}
              setActiveMesh={setActiveMesh}
            />
            <Box setHovered={setHovered} setActiveMesh={setActiveMesh} /> */}
          <directionalLight color="white" position={[0, 0, 3]} />
          <directionalLight color="white" position={[3, 0, 0]} />
          <directionalLight color="white" position={[0, 1, 0]} />
          <directionalLight color="white" position={[0, -3, 0]} />
          {/* <ambientLight intensity={3} /> */}

          <axesHelper args={[8]} />
          <gridHelper size={10} divisions={10} />
          {activeMesh && <TransformControls object={activeMesh} mode={mode} />}
          <OrbitControls makeDefault />
          {/* <Stats /> */}
        </Canvas>
      </div>
    </div>
  );
}
