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
  Clouds,
  BakeShadows,
  Stage,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Leva, useControls, folder } from "leva";
import BottomControllerPanel from "@/components/BottomControllerPanel";
import LeftControllerPanel from "@/components/LeftControllerPanel";
import RightControllerPanel from "@/components/RightControllerPanel";
import MiddleToolBox from "@/components/MiddleToolBox";

import useStore from "@/store";
import MyCamera from "@/models/myCamera";
import MyModel from "@/models/myModel";

import useRightPanel from "@/hooks/useRightPanel";

import { cameraData, meshData, ModelAssetMap } from "@/constant";

function App() {
  const { target, setTarget, geometries, setGeometries } = useStore();

  const [, updateState] = useState();
  window.forceUpdate = useCallback(() => updateState({}), []);

  // 灯光
  const lightRef = useRef();

  // 相机
  const cameraRef = useRef();

  // 缓存 modelListRef
  const modelListRef = useRef(meshData);

  // 相机设置
  const [cameraState, setCameraState] = useState({
    autoRotate: false,
    autoRotateSpeed: 0.5,
    autoRotateClockwise: 1,
  });

  // 控制器设置
  const [transformControllerState, setTransformControllerState] = useState({
    mode: "translate",
  });

  // 模型属性
  const [modelPropertyState, setModelPropertyState] = useState({
    visible: true,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    scale: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  });

  // 模型动画
  const [modelAnimationState, setModelAnimationState] = useState({
    animationType: 0,
    animationData: {},
  });

  const {
    onChangeCameraState,
    onChangeTransformControllerState,
    onChangeModelPropertyState,
    onChangeTransformControls,
    onChangeModelAnimationState,
  } = useRightPanel({
    setCameraState,
    setTransformControllerState,
    setModelPropertyState,
    setModelAnimationState,
  });

  return (
    <div className="out-page-container">
      <MiddleToolBox cameraRef={cameraRef} />
      <LeftControllerPanel modelListRef={modelListRef} />
      <RightControllerPanel
        cameraState={cameraState}
        onChangeCameraState={onChangeCameraState}
        transformControllerState={transformControllerState}
        onChangeTransformControllerState={onChangeTransformControllerState}
        modelPropertyState={modelPropertyState}
        onChangeModelPropertyState={onChangeModelPropertyState}
        modelAnimationState={modelAnimationState}
        onChangeModelAnimationState={onChangeModelAnimationState}
      />
      <div className="main-three-editor-container">
        <Canvas
          dpr={[1, 2]}
          onPointerMissed={() => {
            onChangeTransformControllerState("mode", "translate");
            setTarget(null);
          }}
          onWheel={(e) => {}}
          onPointerDown={(e) => {
            // 鼠标按下
          }}
          onPointerUp={(e) => {
            // 鼠标抬起
          }}
          onTouchMove={(e) => {}}
        >
          <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />

          {modelListRef.current.length > 0 &&
            modelListRef.current.map((item, index) => {
              if (item.modelType === 1) {
                return (
                  <MyModel
                    key={item.id}
                    {...item}
                    setTarget={setTarget}
                    index={index}
                    modelListRef={modelListRef}
                  />
                );
              } else if (item.modelType === 2) {
                const Com = ModelAssetMap[item.modelKey];
                return (
                  <Com
                    key={item.id}
                    {...item}
                    setTarget={setTarget}
                    index={index}
                    modelListRef={modelListRef}
                  />
                );
              }
            })}
          {/* <directionalLight color="red" position={[0, 0, 3]} /> */}
          {/* <directionalLight color="white" position={[3, 0, 0]} /> */}
          {/* <directionalLight color="white" position={[0, 1, 0]} /> */}
          <directionalLight color="white" position={[1, 1, 1]} intensity={10} />
          <gridHelper size={10} divisions={10} />
          <MyCamera
            cameraRef={cameraRef}
            // forceUpdate={forceUpdate}
          />
          {target && (
            <TransformControls
              object={target}
              mode={transformControllerState.mode}
              onChange={onChangeTransformControls}
            />
          )}
          <axesHelper args={[5]} />
          <OrbitControls
            makeDefault
            enableDamping={false}
            autoRotate={cameraState.autoRotate}
            autoRotateSpeed={
              cameraState.autoRotateSpeed * cameraState.autoRotateClockwise
            }
          />
          {/* <Stats /> */}
        </Canvas>
      </div>
    </div>
  );
}

export default memo(App);
