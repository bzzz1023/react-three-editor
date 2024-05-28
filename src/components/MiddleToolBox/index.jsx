import { useRef, useEffect, useCallback, memo } from "react";
import "./index.scss";
import useStore from "@/store";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

const App = ({ cameraRef }) => {
  const aaa = () => {
    // cameraRef.current.position.set(0, 0, 5);
    // console.log(cameraRef.current.position);
    const tween = new TWEEN.Tween(cameraRef.current.position);
    tween.to({ x: 0, y: 0, z: 5 }, 1000);
    // tween.easing(TWEEN.Easing.Quadratic.InOut);
    tween.start();
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
