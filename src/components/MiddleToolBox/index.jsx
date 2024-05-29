import { useRef, useEffect, useCallback, memo } from "react";
import "./index.scss";
import useStore from "@/store";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { Button } from "antd";
const viewAngleMap = {
  1: { x: 0, y: 0, z: 10 },
  2: { x: 10, y: 0, z: 0 },
  3: { x: 0, y: 10, z: 0 },
};
const App = ({ cameraRef }) => {
  const changeViewAngle = (type) => {
    const tween = new TWEEN.Tween(cameraRef.current.position);
    tween.to(viewAngleMap[type], 1000);
    tween.start();
  };

  return (
    <div className="middle-tool-box-container">
      <Button
        onClick={() => {
          changeViewAngle(1);
        }}
      >
        主视图
      </Button>
      <Button
        onClick={() => {
          changeViewAngle(2);
        }}
      >
        右视图
      </Button>
      <Button
        onClick={() => {
          changeViewAngle(3);
        }}
      >
        俯视图
      </Button>
    </div>
  );
};

export default memo(App);
