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
import { InputNumber, Checkbox, Select, Radio, Button } from "antd";
import CameraPanel from "./components/CameraPanel";
import ModelPropertyPanel from "./components/ModelPropertyPanel";
import ModelAnimationPanel from "./components/ModelAnimationPanel";
import TransformControllerPanel from "./components/TransformControllerPanel";
import ScenePanel from "./components/ScenePanel";
import OperationPanel from "./components/OperationPanel";
import LightPanel from "./components/LightPanel"; 
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
  operationState,
  onChangeOperationState,
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
  lightState,
  onChangeLightState,
  handleModel,
}) => {
  const { target, setTarget, geometries, setGeometries } = useStore();
  return (
    <div className="right-controller-panel">
      <div className="header-box">
        <MyTab
          items={tabItems}
          activeKey={rightPannelActiveTabKey}
          onChange={(e) => {
            setRightPannelActiveTabKey(e);
          }}
        />
      </div>
      <div className="config-content-box">
        {rightPannelActiveTabKey === "1" && (
          <>
            <OperationPanel
              operationState={operationState}
              onChangeOperationState={onChangeOperationState}
            />

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
            {/* 灯光 */}
            {target?.userData?.modelType === 3 && (
              <LightPanel
                lightState={lightState}
                onChangeLightState={onChangeLightState}
              />
            )}
            <ModelAnimationPanel
              modelAnimationState={modelAnimationState}
              onChangeModelAnimationState={onChangeModelAnimationState}
            />
          </>
        )}
      </div>
      {target && (
        <div className="delete-box">
          <Button
            danger
            className="btn"
            onClick={() => {
              handleModel({ type: 2, data: target });
            }}
          >
            Remove Model
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(App);
