import { useRef, useEffect, useCallback, memo } from "react";
import useStore from "@/store";

import { ColorPicker, Checkbox, Select, Radio } from "antd";

const App = ({ operationState, onChangeOperationState }) => {
  return (
    <>
      <div className="big-title">操作场景</div>
      <div className="item-box">
        <div className="item-title">显示帧率</div>
        <div className="content-box-one">
          <Checkbox
            checked={operationState.statsVisible}
            onChange={(e) => {
              onChangeOperationState("statsVisible", e.target.checked);
            }}
          />
        </div>
      </div>
      <div className="item-box">
        <div className="item-title">辅助网格</div>
        <div className="content-box-one">
          <Checkbox
            checked={operationState.showGridHelper}
            onChange={(e) => {
              onChangeOperationState("showGridHelper", e.target.checked);
            }}
          />
        </div>
      </div>
      <div className="item-box">
        <div className="item-title">辅助坐标轴</div>
        <div className="content-box-one">
          <Checkbox
            checked={operationState.showAxesHelper}
            onChange={(e) => {
              onChangeOperationState("showAxesHelper", e.target.checked);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default memo(App);
