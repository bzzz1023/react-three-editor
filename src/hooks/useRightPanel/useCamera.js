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

export default ({ setCameraState }) => {
  // 改变camera属性

  const onChangeCameraState = useCallback((key, value) => {
    setCameraState((preState) => {
      return {
        ...preState,
        [key]: value,
      };
    });
  }, []);

  return {
    onChangeCameraState,
  };
};
