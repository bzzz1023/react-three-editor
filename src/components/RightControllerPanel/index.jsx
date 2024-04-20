import { useRef, useEffect, useCallback, memo } from "react";
import "./index.scss";
import useStore from "@/store";

import { InputNumber, Checkbox, Select, Radio } from "antd";
import CameraPanel from "./components/CameraPanel";
import ModelPropertyPanel from "./components/ModelPropertyPanel";
import ModelAnimationPanel from "./components/ModelAnimationPanel";
import TransformControllerPanel from "./components/TransformControllerPanel";

const App = ({
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
      <TransformControllerPanel
        transformControllerState={transformControllerState}
        onChangeTransformControllerState={onChangeTransformControllerState}
      />
      <CameraPanel
        cameraState={cameraState}
        onChangeCameraState={onChangeCameraState}
      />
      <ModelPropertyPanel
        modelPropertyState={modelPropertyState}
        onChangeModelPropertyState={onChangeModelPropertyState}
      />
      <ModelAnimationPanel
        modelAnimationState={modelAnimationState}
        onChangeModelAnimationState={onChangeModelAnimationState}
      />
    </div>
  );
};

export default memo(App);
