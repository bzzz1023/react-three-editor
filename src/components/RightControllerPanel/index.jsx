import {
  useState,
  useRef,
  useEffect,
  useMemo,
  Suspense,
  memo,
  useCallback,
} from "react";
import "./index.scss";
import useStore from "@/store";
import { ColorPicker } from "antd";
import { InputNumber, Checkbox, Select, Radio } from "antd";
import CameraPanel from "./components/CameraPanel";
import ModelPropertyPanel from "./components/ModelPropertyPanel";
import ModelAnimationPanel from "./components/ModelAnimationPanel";
import TransformControllerPanel from "./components/TransformControllerPanel";
import ScenePanel from "./components/ScenePanel";

import MyTab from "@/components/MyTab";

const tabItems = [
  {
    key: "1",
    label: "场景",
  },
  {
    key: "2",
    label: "模型",
  },
];

const App = ({
  rightPannelActiveTabKey,
  setRightPannelActiveTabKey,
  sceneState,
  onChangeSceneState,
  cameraState,
  onChangeCameraState,
  transformControllerState,
  onChangeTransformControllerState,
  modelPropertyState,
  onChangeModelPropertyState,
  modelAnimationState,
  onChangeModelAnimationState,
}) => {
  const { target, setTarget, geometries, setGeometries } = useStore();

  return (
    <div className="right-controller-panel">
      <div style={{ height: 32, width: "100%", padding: "0 8%" }}>
        <MyTab
          items={tabItems}
          activeKey={rightPannelActiveTabKey}
          onChange={(e) => {
            setRightPannelActiveTabKey(e);
          }}
        />
      </div>
      {/*  */}
      <div style={{ height: "calc(100% - 32px)", padding: 12 }}>
        {rightPannelActiveTabKey === "1" && (
          <>
            <ScenePanel
              sceneState={sceneState}
              onChangeSceneState={onChangeSceneState}
            />

            <CameraPanel
              cameraState={cameraState}
              onChangeCameraState={onChangeCameraState}
            />
          </>
        )}

        {rightPannelActiveTabKey === "2" && (
          <>
            <TransformControllerPanel
              transformControllerState={transformControllerState}
              onChangeTransformControllerState={
                onChangeTransformControllerState
              }
            />
            <ModelPropertyPanel
              modelPropertyState={modelPropertyState}
              onChangeModelPropertyState={onChangeModelPropertyState}
            />
            <ModelAnimationPanel
              modelAnimationState={modelAnimationState}
              onChangeModelAnimationState={onChangeModelAnimationState}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default memo(App);
