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

export default () => {
  const [lightState, setLightState] = useState({});

  // 初始化scene
  const setLightProperty = (data) => {
    sceneRef.current.userData = { ...data };

    const { background } = sceneRef.current.userData;
    sceneRef.current.background = new THREE.Color(background);
    setSceneState((preState) => {
      return {
        ...preState,
        background,
      };
    });
  };

  const onChangeLightState = useCallback((key, value) => {}, []);

  return {
    lightState,
    setLightProperty,
    onChangeLightState,
  };
};
