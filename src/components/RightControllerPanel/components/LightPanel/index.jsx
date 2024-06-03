import { useRef, useEffect, useCallback, memo } from "react";
import useStore from "@/store";
import { InputNumber, Checkbox, Select, Radio, ColorPicker } from "antd";

const App = ({ lightState, onChangeLightState }) => {
  return (
    <>
      <div className="big-title">光源</div>

      <div className="item-box">
        <div className="item-title">强度</div>
        <div className="content-box-one">
          <InputNumber
            value={lightState.intensity}
            precision={2}
            className="content-item"
            size="small"
            step={0.01}
            onChange={(e) => {
              onChangeLightState("intensity", e);
            }}
          />
        </div>
      </div>

      <div className="item-box">
        <div className="item-title">颜色</div>
        <div className="content-box-one">
          <ColorPicker
            value={lightState.color}
            disabledAlpha
            format="rgb"
            onChange={(value, hex) => {
              const r = Math.round(value.metaColor.r);
              const g = Math.round(value.metaColor.g);
              const b = Math.round(value.metaColor.b);
              onChangeLightState("color", { r, g, b });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default memo(App);
