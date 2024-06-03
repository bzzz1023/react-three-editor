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
        color: {
          r: color.r,
          g: color.g,
          b: color.b,
        },
      };
    });
  };

  const onChangeLightState = (key, value) => {
    if (key === "color") {
      const { r, g, b } = value;
      target.color.r = r;
      target.color.g = g;
      target.color.b = b;
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
