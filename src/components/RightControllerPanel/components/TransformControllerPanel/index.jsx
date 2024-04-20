import { useRef, useEffect, useCallback, memo } from "react";
import useStore from "@/store";

import { InputNumber, Checkbox, Select, Radio } from "antd";

const App = ({
  transformControllerState,
  onChangeTransformControllerState,
}) => {
  const { target, setTarget, geometries, setGeometries } = useStore();

  return (
    <>
      <div className="big-title">模型控制器</div>

      <div className="item-box">
        <div className="item-title">模式</div>
        <div className="content-box-one">
          <Select
            size="small"
            style={{ width: "100%" }}
            value={transformControllerState.mode}
            options={[
              { value: "translate", label: "translate" },
              { value: "rotate", label: "rotate" },
              { value: "scale", label: "scale" },
            ]}
            onChange={(e) => {
              onChangeTransformControllerState("mode", e);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default memo(App);
