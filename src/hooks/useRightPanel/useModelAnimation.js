import {
  useState,
  useRef,
  useEffect,
  useMemo,
  Suspense,
  memo,
  useCallback,
  useLayoutEffect,
} from "react";
import useStore from "@/store";
import cloneDeep from "lodash/cloneDeep";

import { AnimationDataMap } from "@/constant";

export default () => {
  const { target, setTarget, geometries, setGeometries } = useStore();
  // 模型动画
  const [modelAnimationState, setModelAnimationState] = useState({
    animationType: 0,
    animationData: {},
  });
  const setNestedPropertyValue = (key, value, obj) => {
    const keys = key.split("."); // 将键路径分割成数组
    let current = obj;
    // 迭代对象以找到指定路径
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    // 更新最后一个键的值
    current[keys[keys.length - 1]] = value;
  };

  // 初始化动画数据状态
  const setModelAnimation = (object) => {
    const { userData } = object;
    if (Object.keys(userData).length === 0) return;

    const { animationType, animationData } = userData;

    const data =
      animationData[animationType] || AnimationDataMap[animationType];

    setModelAnimationState(() => {
      return {
        animationType,
        animationData: data,
      };
    });
  };

  // 动画 - 旋转动画、移动动画
  const onChangeModelAnimationOne = (key, value) => {
    const { animationData, animationType } = target.userData;
    const preData = animationData[animationType];

    const newData = { animationData: cloneDeep(preData) };
    setNestedPropertyValue(key, value, newData);

    target.userData.animationData[animationType] = newData.animationData;
  };

  // 动画 - 条件动画
  const onChangeModelAnimationTwo = (key, value) => {
    const { animationData, animationType } = target.userData;
    const preData = animationData[animationType];

    const newData = { animationData: cloneDeep(preData) };
    setNestedPropertyValue(key, value, newData);

    target.userData.animationData[animationType] = newData.animationData;
  };

  // 改变模型动画属性
  const onChangeModelAnimation = (animationType, key, value) => {
    target.userData.animationType = animationType;
    // if (animationType === 0) return;
    switch (animationType) {
      case 0:
        break;
      case 1 || 2:
        onChangeModelAnimationOne(key, value);
        break;
      case 3:
        // 条件动画
        break;
    }
  };

  // 改变模型动画数据state
  const onChangeModelAnimationState = (key, value) => {
    setModelAnimationState((preState) => {
      const newState = cloneDeep(preState);
      setNestedPropertyValue(key, value, newState);
      if (key === "animationType") {
        // 赋值动画数据
        const tempAnimationData = target.userData.animationData[value];
        setNestedPropertyValue("animationData", tempAnimationData, newState);
      }
      const animationType = newState.animationType;
      onChangeModelAnimation(animationType, key, value);
      return newState;
    });
  };

  return {
    modelAnimationState,
    setModelAnimation,
    onChangeModelAnimationState,
  };
};
