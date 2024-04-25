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

export default ({ setModelAnimationState }) => {
  const { target, setTarget, geometries, setGeometries } = useStore();

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
    const {
      userData: { animationType, animationData },
    } = object;

    const data =
      animationData[animationType] || AnimationDataMap[animationType];

    setModelAnimationState(() => {
      return {
        animationType,
        animationData: data,
      };
    });
  };

  // 动画1 - 修改 模型对象 属性值
  const onChangeModelAnimationOne = (key, value) => {
    const { animationData, animationType } = target.userData;
    const preData = animationData[animationType];

    const newData = { animationData: cloneDeep(preData) };
    setNestedPropertyValue(key, value, newData);

    target.userData.animationData[animationType] = newData.animationData;
  };

  // 动画2 - 修改 模型对象 属性值
  const onChangeModelAnimationTwo = (key, value) => {
    const { animationData, animationType } = target.userData;
    const preData = animationData[animationType];

    const newData = { animationData: cloneDeep(preData) };
    setNestedPropertyValue(key, value, newData);

    target.userData.animationData[animationType] = newData.animationData;
  };

  // 改变模型动画属性
  const onChangeModelAnimation = (animationType, key, value) => {
    const funcMap = {
      1: onChangeModelAnimationOne,
      2: onChangeModelAnimationTwo,
    };
    target.userData.animationType = animationType;
    if (animationType === 0) return;
    funcMap[animationType](key, value);
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
    setModelAnimation,
    onChangeModelAnimationState,
  };
};
