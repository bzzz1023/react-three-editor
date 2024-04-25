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

const App = ({}) => {
  const ref = useRef();

  return <directionalLight color="white" position={[1, 1, 1]} intensity={10} />;
};

export default memo(App);
