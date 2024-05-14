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
  const sceneRef = useRef();

  const [sceneState, setSceneState] = useState({});

  // 初始化scene
  const initScene = (data) => {
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

  const onChangeSceneState = useCallback((key, value) => {
    // console.log(sceneRef.current);
    console.log(value);
    setSceneState((preState) => {
      return {
        ...preState,
        [key]: value,
      };
    });
    sceneRef.current[key] = new THREE.Color(`${value}`);
  }, []);

  return {
    sceneRef,
    sceneState,
    initScene,
    onChangeSceneState,
  };
};
