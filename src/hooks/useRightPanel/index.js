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

export default () => {
  const { target, setTarget, geometries, setGeometries } = useStore();

  // 右侧tab栏
  const [rightPannelActiveTabKey, setRightPannelActiveTabKey] = useState("1");

  // 场景
  const sceneRef = useRef();

  const [sceneState, setSceneState] = useState({});

  // 相机
  const cameraRef = useRef();

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

  const { onChangeSceneState } = useScene({ setSceneState, sceneRef });

  const { onChangeCameraState } = useCamera({ setCameraState });

  const { onChangeTransformControllerState } = useTransformController({
    setTransformControllerState,
  });

  const {
    setModelProperty,
    onChangeModelPropertyState,
    onChangeTransformControls,
  } = useModelProperty({
    setModelPropertyState,
  });

  const { setModelAnimation, onChangeModelAnimationState } = useModelAnimation({
    setModelAnimationState,
  });

  // 初始化camera，

  useEffect(() => {
    if (target) {
      console.log("切换target===", target);
      setModelProperty(target);
      setModelAnimation(target);
      setRightPannelActiveTabKey("2");
    }
  }, [target]);

  return {
    sceneRef,

    cameraRef,

    rightPannelActiveTabKey,
    setRightPannelActiveTabKey,

    sceneState,
    onChangeSceneState,

    cameraState,
    onChangeCameraState,

    transformControllerState,
    onChangeTransformControllerState,
    onChangeTransformControls,

    modelPropertyState,
    onChangeModelPropertyState,

    modelAnimationState,
    onChangeModelAnimationState,
  };
};
