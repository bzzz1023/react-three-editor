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

export default ({ setSceneState, sceneRef }) => {
  // 改变camera属性

  const onChangeSceneState = useCallback((key, value) => {
    // console.log(sceneRef.current);
    // console.log(value);
    setSceneState((preState) => {
      return {
        ...preState,
        [key]: value,
      };
    });
    sceneRef.current[key] = new THREE.Color(`${value}`);
  }, []);

  return {
    onChangeSceneState,
  };
};
