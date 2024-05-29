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
            precision={0}
            className="content-item"
            size="small"
            step={1}
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
            // value={lightState.color}
            disabledAlpha
            format="rgb"
            onChange={(_, hex) => {
              console.log('2222==',hex);
              // onChangeLightState("color", hex);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default memo(App);
