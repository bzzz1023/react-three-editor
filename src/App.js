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

import BottomControllerPanel from "@/components/BottomControllerPanel";
import LeftControllerPanel from "@/components/LeftControllerPanel";
import RightControllerPanel from "@/components/RightControllerPanel";
import MiddleToolBox from "@/components/MiddleToolBox";

import useStore from "@/store";
import MyCamera from "@/models/myCamera";
import MyScene from "@/models/myScene";
import MyModel from "@/models/myModel";
import Light from "@/models/light";

import useRightPanel from "@/hooks/useRightPanel";

import { ModelAssetMap } from "@/constant";

import { GetCanvasDataApi } from "@/api/mock.js";

function App() {
  const { target, setTarget, geometries, setGeometries } = useStore();

  const [, updateState] = useState();
  window.forceUpdate = useCallback(() => updateState({}), []);

  // 缓存 modelListRef
  const modelListRef = useRef([]);

  const {
    sceneRef,

    cameraRef,

    rightPannelActiveTabKey,
    setRightPannelActiveTabKey,

    sceneState,
    initScene,
    onChangeSceneState,

    cameraState,
    initCamera,
    onChangeCameraState,

    transformControllerState,
    onChangeTransformControllerState,
    onChangeTransformControls,

    modelPropertyState,
    onChangeModelPropertyState,

    modelAnimationState,
    onChangeModelAnimationState,
  } = useRightPanel();

  useEffect(() => {
    (async () => {
      const res = await GetCanvasDataApi();
      if (res.code === 200) {
        const { sceneData, cameraData, modelData } = res.data;
        // 初始化模型
        modelListRef.current = [...modelData];
        window.forceUpdate();
        // 初始化相机
        initCamera(cameraData);
        // 初始化场景
        initScene(sceneData)
      }
    })();
  }, []);

  return (
    <div className="out-page-container">
      <MiddleToolBox cameraRef={cameraRef} />
      <LeftControllerPanel modelListRef={modelListRef} />
      <RightControllerPanel
        rightPannelActiveTabKey={rightPannelActiveTabKey}
        setRightPannelActiveTabKey={setRightPannelActiveTabKey}
        sceneState={sceneState}
        onChangeSceneState={onChangeSceneState}
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
            setRightPannelActiveTabKey("1");
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
          <MyScene sceneRef={sceneRef} />
          <MyCamera cameraRef={cameraRef} />
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
              } else if (item.modelType === 3) {
                return (
                  <Light
                    key={item.id}
                    {...item}
                    setTarget={setTarget}
                    index={index}
                    modelListRef={modelListRef}
                  />
                );
              }
            })}

          {target && (
            <TransformControls
              object={target}
              mode={transformControllerState.mode}
              onChange={onChangeTransformControls}
            />
          )}
          <gridHelper size={10} divisions={10} />
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
