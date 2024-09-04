import {
  useState,
  useRef,
  useEffect,
  useMemo,
  Suspense,
  memo,
  useCallback,
} from "react";
import "./index.scss";
import useStore from "@/store";
import { v4 as uuidv4 } from "uuid";

import MyTree from "@/components/MyTree";
import MyTab from "@/components/MyTab";
import { Collapse } from "antd";

import injectCollapseItems from "./components/collapseItems";

import { AnimationDataMap } from "@/constant";

const tabItems = [
  {
    key: "1",
    label: "场景",
  },
  {
    key: "2",
    label: "资源",
  },
];

const App = ({ modelListRef, handleModel, dataSourceState }) => {
  const { target, setTarget, geometries, setGeometries } = useStore();
  const [activeTabKey, setActiveTabKey] = useState("2");
  const onChangeModelList = (data) => {
    const { config } = data;
    const { userData, ...configArgs } = config;
    const newModel = {
      id: uuidv4(),
      ...configArgs,
      userData: {
        ...configArgs,
        ...userData,
        // 动画数据
        animationData: { ...AnimationDataMap },
        animationType: 0,
      },
    };
    handleModel({
      type: 1,
      data: [newModel],
    });
  };

  const onChangeUploadModel = ({ name, url }) => {
    const newModel = {
      id: uuidv4(),
      modelType: 1,
      url,
      userData: {
        modelType: 1,
        modelName: name,
        position: { x: 1, y: 0, z: 1 },
        rotation: { x: 0, y: 180, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        animationType: 0,
        animationData: { ...AnimationDataMap },
      },
    };
    handleModel({
      type: 1,
      data: [newModel],
    });
  };

  const collapseItems = injectCollapseItems({
    onChangeModelList,
    onChangeUploadModel,
  });

  return (
    <div className="left-controller-panel">
      <div className="header-box">
        <MyTab
          items={tabItems}
          activeKey={activeTabKey}
          onChange={(e) => {
            setActiveTabKey(e);
          }}
        />
      </div>
      <div className="config-content-box">
        {activeTabKey === "1" && (
          <MyTree
            activeuuid={target && target.uuid}
            treeData={modelListRef.current}
            onSelect={(object) => {
              setTarget(object);
            }}
          />
        )}

        {activeTabKey === "2" && (
          <Collapse items={collapseItems} defaultActiveKey={["1", "2", "3"]} />
        )}
      </div>
    </div>
  );
};

export default App;
