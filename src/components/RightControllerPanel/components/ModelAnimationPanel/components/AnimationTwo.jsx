import { useRef, useEffect, useCallback, memo } from "react";
import useStore from "@/store";

import { InputNumber, Checkbox, Select, Radio } from "antd";

const options = [
  { label: "x", value: "x" },
  { label: "y", value: "y" },
  { label: "z", value: "z" },
];

const App = ({ modelAnimationState, onChangeModelAnimationState }) => {
  const { animationData, animationType } = modelAnimationState;
  return (
    <>
      <div className="item-box">
        <div className="item-title">循环移动方向</div>
        <Checkbox.Group
          options={options}
          value={animationData.moveDirection}
          onChange={(e) => {
            onChangeModelAnimationState(`animationData.moveDirection`, e);
          }}
        />
      </div>
      <div className="item-box">
        <div className="item-title">移动范围</div>
        <InputNumber
          precision={2}
          className="content-item"
          size="small"
          step={0.01}
          value={animationData.moveRange}
          onChange={(e) => {
            onChangeModelAnimationState("animationData.moveRange", e);
          }}
        />
      </div>
      <div className="item-box">
        <div className="item-title">移动速率</div>
        <InputNumber
          precision={2}
          className="content-item"
          size="small"
          step={0.01}
          value={animationData.moveSpeed}
          onChange={(e) => {
            onChangeModelAnimationState("animationData.moveSpeed", e);
          }}
        />
      </div>
    </>
  );
};

export default memo(App);
