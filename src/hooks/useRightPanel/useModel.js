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
  window.forceUpdate = useCallback(() => updateState({}), []);

  // 缓存 modelListRef
  const modelListRef = useRef([]);

  

  return {};
};
