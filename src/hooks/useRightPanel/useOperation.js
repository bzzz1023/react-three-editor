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
  const [operationState, setOperationState] = useState({});

  // 初始化scene
  const initOperation = (data) => {
    setOperationState((preState)=>{
      return {
        ...preState,
        ...data
      }
    })
  };

  const onChangeOperationState = useCallback((key, value) => {
    setOperationState((preState)=>{
      return {
        ...preState,
        [key]:value
      }
    })
  }, []);

  return {
    operationState,
    initOperation,
    onChangeOperationState,
  };
};
