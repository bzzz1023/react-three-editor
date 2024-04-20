import { useRef, useEffect, useState, memo } from "react";
import './index.scss'
import { Slider } from 'antd';
import useStore from "@/store";

const toolList = [
  {
    key: 0,
    label: "模型"
  },
  {
    key: 1,
    label: "场景"
  },
  {
    key: 2,
    label: "动画"
  },
]
const App = ({ meshList, changeAnimationState, addMesh }) => {
  const { target, setTarget, geometries, setGeometries } = useStore(); // Use store

  const [activeToolKey, setActiveToolKey] = useState(2)

  // console.log(target);

  return (
    <div className="bottom-controller-panel">
      <button onClick={() => {
        const url = "http://127.0.0.1:7001/v1/model/soldier.glb"
        addMesh(url)
      }}>添加模型</button>
      <div className="top-tool-bar">

        {
          toolList.map((item) => {
            return (
              <div
                onClick={() => {
                  setActiveToolKey(item.key)
                }}
                key={item.key} className={`tool-item ${activeToolKey === item.key ? "tool-item-active" : ""}`}>{item.label}</div>
            )
          })
        }
      </div>
      <>
        {/* {
          activeToolKey === 0 && meshList.length > 0 && (
            <div className="mesh-list-container">
              {
                meshList.map((item, index) => {
                  return (
                    <div
                      className="mesh-item-container"
                      key={index}
                      onClick={() => {
                      }}
                    >{item.modelName.split('.')[0]}</div>
                  )
                })
              }
            </div>
          )
        } */}
      </>
      <>
        {
          activeToolKey === 2 && (
            <div className="animation-list-container">
              <div>
                <span>旋转速度</span>
                <div>{target?.userData?.modelName}</div>
                <Slider
                  min={0} max={20}
                  step={1}
                  onChangeComplete={(e) => {
                    // console.log(target);
                    // const temp = target

                    // if (temp) {
                    //   temp?.userData?.rotateSpeed = e
                    //   setTarget(temp)
                    // }
                    // changeAnimationState("rotateSpeed", e)
                  }}
                />
              </div>
            </div>
          )
        }
      </>
    </div>
  );
};

export default memo(App);
