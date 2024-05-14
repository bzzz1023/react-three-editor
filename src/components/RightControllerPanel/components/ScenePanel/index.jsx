import { useRef, useEffect, useCallback, memo } from "react";
import useStore from "@/store";

import { ColorPicker, Checkbox, Select, Radio } from "antd";

const App = ({ sceneState, onChangeSceneState }) => {

  return (
    <>
      <div className="big-title">场景</div>

      <div className="item-box">
        <div className="item-title">背景色</div>
        <div className="content-box-one">
          <ColorPicker
            disabledAlpha
            value={sceneState.background}
            format="hex"
            onChange={(_, hex) => {
              onChangeSceneState("background", hex);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default memo(App);
