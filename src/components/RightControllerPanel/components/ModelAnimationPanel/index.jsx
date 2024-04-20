import { useRef, useEffect, useCallback, memo } from "react";
import useStore from "@/store";

import { InputNumber, Checkbox, Select, Radio } from "antd";

import AnimationOne from "./components/AnimationOne";

const App = ({ modelAnimationState, onChangeModelAnimationState }) => {
  const { target, setTarget, geometries, setGeometries } = useStore();

  return (
    <>
      {target && (
        <>
          <div className="big-title">模型动画</div>

          <div className="item-box">
            <div className="item-title">动画类型</div>
            <Select
              size="small"
              style={{ width: "100%" }}
              value={modelAnimationState.animationType}
              options={[
                { value: 0, label: "无" },
                { value: 1, label: "旋转动画" },
                { value: 2, label: "移动动画" },
              ]}
              onChange={(e) => {
                onChangeModelAnimationState("animationType", e);
              }}
            />
          </div>

          {modelAnimationState.animationType === 1 && (
            <AnimationOne
              modelAnimationState={modelAnimationState}
              onChangeModelAnimationState={onChangeModelAnimationState}
            />
          )}
        </>
      )}
    </>
  );
};

export default memo(App);
