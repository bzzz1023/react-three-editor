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
import { Canvas, useFrame, useThree } from "@react-three/fiber";

export default () => {
  // 相机
  const cameraRef = useRef();

  // 相机设置
  const [cameraState, setCameraState] = useState({
    autoRotate: false,
    autoRotateSpeed: 0.5,
    autoRotateClockwise: 1,
  });

  // 初始化camera 属性
  const initCamera = (data) => {
    cameraRef.current.userData = { ...data };
    cameraRef.current.position.set(...cameraRef.current.userData.position);
    cameraRef.current.lookAt(0, 0, 0);
  };

  // 改变camera state
  const onChangeCameraState = (key, value) => {
    setCameraState((preState) => {
      return {
        ...preState,
        [key]: value,
      };
    });
  };

  return {
    cameraRef,
    cameraState,
    initCamera,
    onChangeCameraState,
  };
};
