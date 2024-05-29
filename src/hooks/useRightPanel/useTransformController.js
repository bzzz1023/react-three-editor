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

export default () => {
    // 控制器设置
    const [transformControllerState, setTransformControllerState] = useState({
      mode: "translate",
    });

  const onChangeTransformControllerState = useCallback((key, value) => {
    setTransformControllerState((preState) => {
      return {
        ...preState,
        [key]: value,
      };
    });
  }, []);

  return {
    transformControllerState,
    onChangeTransformControllerState,
  };
};
