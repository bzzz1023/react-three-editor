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

export default ({
  setCameraState,
  setTransformControllerState,
  setModelPropertyState,
  setModelAnimationState,
}) => {
  const { target, setTarget, geometries, setGeometries } = useStore();

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

  useEffect(() => {
    if (target) {
      setModelProperty(target);
      setModelAnimation(target);
    }
  }, [target]);

  return {
    onChangeCameraState,
    onChangeTransformControllerState,
    onChangeModelPropertyState,
    onChangeTransformControls,
    onChangeModelAnimationState,
  };
};
