import { useRef, useEffect, useCallback, memo } from "react";
import useStore from "@/store";

import { InputNumber, Checkbox, Select, Radio } from "antd";

const App = ({ cameraState, onChangeCameraState }) => {
  const { target, setTarget, geometries, setGeometries } = useStore();

  return (
    <>
      <div className="big-title">相机</div>

      <div className="item-box">
        <div className="item-title">自动旋转</div>
        <div className="content-box-one">
          <Checkbox
            checked={cameraState.autoRotate}
            onChange={(e) => {
              onChangeCameraState("autoRotate", e.target.checked);
            }}
          />
        </div>
        {cameraState.autoRotate && (
          <>
            <div className="item-title">自动旋转速度</div>
            <div className="content-box-one">
              <InputNumber
                precision={2}
                min={0}
                className="content-item"
                size="small"
                step={0.01}
                value={cameraState.autoRotateSpeed}
                onChange={(e) => {
                  onChangeCameraState("autoRotateSpeed", e);
                }}
              />
            </div>
            <div className="item-box">
              <div className="item-title">旋转方向</div>
              <Radio.Group
                onChange={(e) => {
                  onChangeCameraState("autoRotateClockwise", e.target.value);
                }}
                value={cameraState.autoRotateClockwise}
              >
                <Radio value={-1}>顺时针</Radio>
                <Radio value={1}>逆时针</Radio>
              </Radio.Group>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default memo(App);
