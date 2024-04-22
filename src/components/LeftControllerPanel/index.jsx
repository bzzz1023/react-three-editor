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
import { v4 as uuidv4 } from 'uuid';

import MyTree from "@/components/MyTree";
import MyTab from "@/components/MyTab";
import { Collapse } from "antd";

import injectCollapseItems from "./config/collapseItems";

import { AnimationDataMap } from "@/constant";

const tabItems = [
  {
    key: "1",
    label: "项目",
  },
  {
    key: "2",
    label: "资源",
  },
];

const App = ({ modelListRef }) => {
  const { target, setTarget, geometries, setGeometries } = useStore(); // Use store

  const [activeTabKey, setActiveTabKey] = useState("2");

  const onChangeModelList = (data) => {
    const { config } = data;
    const { userData, ...configArgs } = config;
    console.log(config);
    modelListRef.current.push({
      id: uuidv4(),
      ...configArgs,
      userData: {
        ...userData,
        // 动画数据
        animationData: AnimationDataMap,
        animationType: 0,
      },
    });

    window.forceUpdate();
  };

  const collapseItems = injectCollapseItems({
    onChangeModelList,
    modelListRef,
  });

  return (
    <div className="left-controller-panel">
      <div style={{ height: 32, width: "100%", padding: "0 8%" }}>
        <MyTab
          items={tabItems}
          activeKey={activeTabKey}
          onChange={(e) => {
            setActiveTabKey(e);
          }}
        />
      </div>
      <div style={{ height: "calc(100% - 32px)" }}>
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
          <Collapse items={collapseItems} defaultActiveKey={["1"]} />
        )}
      </div>
    </div>
  );
};

export default App;
