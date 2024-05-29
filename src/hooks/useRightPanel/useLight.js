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
import useStore from "@/store";

export default () => {
  const { target, setTarget, geometries, setGeometries } = useStore();

  const [lightState, setLightState] = useState({});

  // 初始化scene
  const setLightProperty = (object) => {
    const { intensity, color } = object;
    console.log(color);
    setLightState((preState) => {
      return {
        ...preState,
        intensity,
      };
    });
  };

  const onChangeLightState = (key, value) => {
    if (key === "color") {
      target.color.r = 255
      target.color.g = 182
      target.color.b = 193
    } else {
      setLightState((preState) => {
        return {
          ...preState,
          [key]: value,
        };
      });
      target[key] = value;
    }
  };

  return {
    lightState,
    setLightProperty,
    onChangeLightState,
  };
};
