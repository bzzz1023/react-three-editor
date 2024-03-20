import { useRef, useEffect, useState, memo } from "react";
import './index.scss'
import { Slider } from 'antd';

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
const App = ({ meshList, selectMesh, changeAnimationState }) => {

  const [activeToolKey, setActiveToolKey] = useState(0)

  return (
    <div className="bottom-controller-panel">
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
        {
          activeToolKey === 0 && meshList.length > 0 && (
            <div className="mesh-list-container">
              {
                meshList.map((item, index) => {
                  return (
                    <div
                      className="mesh-item-container"
                      key={index}
                      onClick={() => {
                        selectMesh(index)
                      }}
                    >{item.meshName.split('.')[0]}</div>
                  )
                })
              }
            </div>
          )
        }
      </>
      <>
        {
          activeToolKey === 2 && (
            <div className="animation-list-container">
              <div>
                <span>旋转速度</span>
                <Slider
                  min={0} max={20}
                  step={1}
                  onChangeComplete={(e) => {
                    changeAnimationState("rotateSpeed", e)
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
