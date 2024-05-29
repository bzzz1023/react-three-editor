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
import cloneDeep from "lodash/cloneDeep";
import useStore from "@/store";
import useCamera from "./useCamera";
import useTransformController from "./useTransformController";
import useModelProperty from "./useModelProperty";
import useModelAnimation from "./useModelAnimation";
import useScene from "./useScene";
import useOperation from "./useOperation";
import useLight from "./useLight";

export default () => {
  const { target, setTarget, geometries, setGeometries } = useStore();

  // 右侧tab栏
  const [rightPannelActiveTabKey, setRightPannelActiveTabKey] = useState("1");

  const { operationState, initOperation, onChangeOperationState } =
    useOperation();

  const { sceneRef, sceneState, initScene, onChangeSceneState } = useScene();

  const { cameraRef, cameraState, initCamera, onChangeCameraState } =
    useCamera();

  const { transformControllerState, onChangeTransformControllerState } =
    useTransformController();

  const { lightState, setLightProperty, onChangeLightState } = useLight();

  const {
    modelPropertyState,
    setModelProperty,
    onChangeModelPropertyState,
    onChangeTransformControls,
  } = useModelProperty();

  const {
    modelAnimationState,
    setModelAnimation,
    onChangeModelAnimationState,
  } = useModelAnimation();

  useEffect(() => {
    if (target) {
      console.log("切换target===", target);
      setModelProperty(target);
      setModelAnimation(target);
      setRightPannelActiveTabKey("2");
      if (target.isLight) {
        setLightProperty(target);
      }
    } else {
      onChangeTransformControllerState("mode", "translate");
      setRightPannelActiveTabKey("1");
    }
  }, [target]);

  return {
    sceneRef,

    cameraRef,

    rightPannelActiveTabKey,
    setRightPannelActiveTabKey,

    operationState,
    initOperation,
    onChangeOperationState,

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

    lightState,
    onChangeLightState,
  };
};
