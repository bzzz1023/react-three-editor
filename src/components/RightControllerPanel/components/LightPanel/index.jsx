import { useRef, useEffect, useCallback, memo } from "react";
import useStore from "@/store";
import { InputNumber, Checkbox, Select, Radio, ColorPicker } from "antd";

const App = ({ sceneState, onChangeSceneState }) => {
  return (
    <>
      <div className="big-title">光源</div>

      <div className="item-box">
        <div className="item-title">强度</div>
        <div className="content-box-one">
          <InputNumber
            precision={3}
            className="content-item"
            size="small"
            step={0.1}
            onChange={(e) => {}}
          />
        </div>
      </div>
    </>
  );
};

export default memo(App);
