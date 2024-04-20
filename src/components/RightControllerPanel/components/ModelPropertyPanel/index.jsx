import { useRef, useEffect, useCallback, memo } from "react";
import useStore from "@/store";

import { InputNumber, Checkbox, Select, Radio } from "antd";

const App = ({ modelPropertyState, onChangeModelPropertyState }) => {
  const { target, setTarget, geometries, setGeometries } = useStore();

  return (
    <>
      {target && (
        <>
          <div className="big-title">模型</div>
          <div className="item-box">
            <div className="item-title">显示</div>
            <Checkbox
              checked={modelPropertyState.visible}
              onChange={(e) => {
                onChangeModelPropertyState("visible", e.target.checked);
              }}
            />
          </div>
          <div className="item-box">
            <div className="item-title">位置</div>
            <div className="content-box-two">
              <InputNumber
                // disabled={rotateAnimation.enableRotate}
                precision={3}
                className="content-item"
                prefix="x"
                size="small"
                step={0.01}
                value={modelPropertyState.position.x}
                onChange={(e) => {
                  onChangeModelPropertyState("position.x", e);
                }}
              />
              <InputNumber
                precision={3}
                className="content-item"
                prefix="y"
                size="small"
                step={0.01}
                value={modelPropertyState.position.y}
                onChange={(e) => {
                  onChangeModelPropertyState("position.y", e);
                }}
              />
              <InputNumber
                // disabled={rotateAnimation.enableRotate}
                precision={3}
                className="content-item"
                prefix="z"
                size="small"
                step={0.01}
                value={modelPropertyState.position.z}
                onChange={(e) => {
                  onChangeModelPropertyState("position.z", e);
                }}
              />
            </div>
          </div>

          <div className="item-box">
            <div className="item-title">缩放</div>
            <div className="content-box-two">
              <InputNumber
                precision={3}
                className="content-item"
                prefix="x"
                size="small"
                step={0.01}
                value={modelPropertyState.scale.x}
                onChange={(e) => {
                  onChangeModelPropertyState("scale.x", e);
                }}
              />
              <InputNumber
                precision={3}
                className="content-item"
                prefix="y"
                size="small"
                step={0.01}
                value={modelPropertyState.scale.y}
                onChange={(e) => {
                  onChangeModelPropertyState("scale.y", e);
                }}
              />
              <InputNumber
                precision={3}
                className="content-item"
                prefix="z"
                size="small"
                step={0.01}
                value={modelPropertyState.scale.z}
                onChange={(e) => {
                  onChangeModelPropertyState("scale.z", e);
                }}
              />
            </div>
          </div>

          <div className="item-box">
            <div className="item-title">旋转</div>
            <div className="content-box-two">
              <InputNumber
                precision={3}
                className="content-item"
                prefix="x"
                size="small"
                step={0.01}
                value={modelPropertyState.rotation.x}
                onChange={(e) => {
                  onChangeModelPropertyState("rotation.x", e);
                }}
              />
              <InputNumber
                precision={3}
                className="content-item"
                prefix="y"
                size="small"
                step={0.01}
                value={modelPropertyState.rotation.y}
                onChange={(e) => {
                  onChangeModelPropertyState("rotation.y", e);
                }}
              />
              <InputNumber
                precision={3}
                className="content-item"
                prefix="z"
                size="small"
                step={0.01}
                value={modelPropertyState.rotation.z}
                onChange={(e) => {
                  onChangeModelPropertyState("rotation.z", e);
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default memo(App);
