import { useRef, useEffect, useCallback, memo } from "react";
import useStore from "@/store";

import { InputNumber, Checkbox, Select, Radio } from "antd";

const App = ({ modelAnimationState, onChangeModelAnimationState }) => {
  const { animationData, animationType } = modelAnimationState;
  return (
    <>
      <div className="item-box">
        <div className="item-title">自身旋转</div>
        <Checkbox
          checked={animationData.enableRotateSelf}
          onChange={(e) => {
            onChangeModelAnimationState(
              `animationData.enableRotateSelf`,
              e.target.checked
            );
          }}
        />
      </div>
      <div className="item-box">
        <div className="item-title">旋转半径</div>
        <InputNumber
          precision={2}
          className="content-item"
          size="small"
          step={0.01}
          value={animationData.rotateRadius}
          onChange={(e) => {
            onChangeModelAnimationState("animationData.rotateRadius", e);
          }}
        />
      </div>
      <div className="item-box">
        <div className="item-title">旋转方向</div>
        <Radio.Group
          onChange={(e) => {
            onChangeModelAnimationState(
              "animationData.rotateClockwise",
              e.target.value
            );
          }}
          value={animationData.rotateClockwise}
        >
          <Radio value={-1}>顺时针</Radio>
          <Radio value={1}>逆时针</Radio>
        </Radio.Group>
      </div>
      <div className="item-box">
        <div className="item-title">旋转速率</div>
        <InputNumber
          precision={2}
          className="content-item"
          size="small"
          step={0.01}
          value={animationData.rotateSpeed}
          onChange={(e) => {
            onChangeModelAnimationState("animationData.rotateSpeed", e);
          }}
        />
      </div>
      <div className="item-box">
        <div className="item-title">旋转中心</div>
        <div className="content-box-two">
          <InputNumber
            precision={3}
            className="content-item"
            prefix="x"
            size="small"
            step={0.01}
            value={animationData.rotatePivot.x}
            onChange={(e) => {
              onChangeModelAnimationState("animationData.rotatePivot.x", e);
            }}
          />
          <InputNumber
            precision={3}
            disabled
            className="content-item"
            prefix="y"
            size="small"
            step={0.01}
            value={animationData.rotatePivot.y}
            onChange={(e) => {
              // onChangeModelPropertyState("modelAnimationState.rotatePivot.y", e);
              // onChangeModelProperty("modelAnimationState.rotatePivot.y", e);
            }}
          />
          <InputNumber
            precision={3}
            className="content-item"
            prefix="z"
            size="small"
            step={0.01}
            value={animationData.rotatePivot.z}
            onChange={(e) => {
              onChangeModelAnimationState("animationData.rotatePivot.z", e);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default memo(App);
