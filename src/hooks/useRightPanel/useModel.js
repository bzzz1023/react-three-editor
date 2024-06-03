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
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  // 缓存 modelListRef
  const modelListRef = useRef([]);

  // 新增
  const addModel = (models) => {
    modelListRef.current = [...modelListRef.current, ...models];
  };

  const handleModel = ({ type, data }) => {
    // 方法映射
    const handleMap = {
      1: addModel,
    };
    handleMap[type](data);
    forceUpdate();
  };

  return { modelListRef, handleModel };
};
