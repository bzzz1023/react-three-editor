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

export default ({ setTransformControllerState }) => {
  // 改变camera属性

  const onChangeTransformControllerState = useCallback((key, value) => {
    setTransformControllerState((preState) => {
      return {
        ...preState,
        [key]: value,
      };
    });
  }, []);

  return {
    onChangeTransformControllerState,
  };
};
