import { useRef, useEffect, useCallback, memo } from "react";
import "./index.scss";
import useStore from "@/store";
import * as THREE from "three";

const App = ({ cameraRef }) => {
  const aaa = () => {
    cameraRef.current.position.set(0, 0, 5);
    cameraRef.current.lookAt(2, 2, 2);
  };
  return (
    <div className="middle-tool-box-container">
      <div>
        <button onClick={aaa}>正视图</button>
      </div>
      <div>
        <button>俯视图</button>
      </div>
    </div>
  );
};

export default memo(App);
