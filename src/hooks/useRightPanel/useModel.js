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
import useStore from "@/store";

export default () => {
  const { target, setTarget, geometries, setGeometries } = useStore();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  // 缓存 modelListRef
  const modelListRef = useRef([]);

  // 新增
  const addModel = (models) => {
    modelListRef.current = [...modelListRef.current, ...models];
  };

  // 删除
  const delModel = (model) => {
    const { uuid } = model;
    const modelIndex = modelListRef.current.findIndex((e) => {
      return e.mesh.scene.uuid === uuid;
    });
    modelListRef.current.splice(modelIndex, 1);
    setTarget(null);
  };

  const handleModel = ({ type, data }) => {
    // 方法映射
    const handleMap = {
      1: addModel,
      2: delModel,
    };
    handleMap[type](data);
    forceUpdate();
  };

  return { modelListRef, handleModel };
};
