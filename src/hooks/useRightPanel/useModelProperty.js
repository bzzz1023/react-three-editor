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

export default ({ setModelPropertyState }) => {
  const { target, setTarget, geometries, setGeometries } = useStore();

  const setNestedPropertyValue = useCallback((key, value, obj) => {
    const keys = key.split("."); // 将键路径分割成数组
    let current = obj;
    // 迭代对象以找到指定路径
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    // 更新最后一个键的值
    current[keys[keys.length - 1]] = value;
  }, []);

  // 改变模型属性
  const onChangeModelProperty = (key, value) => {
    const positionFlag = key.indexOf("position") !== -1;
    const scaleFlag = key.indexOf("scale") !== -1;
    const rotationFlag = key.indexOf("rotation") !== -1;
    const visibleFlag = key.indexOf("visible") !== -1;

    const xFlag = key.indexOf("x") !== -1;
    const yFlag = key.indexOf("y") !== -1;
    const zFlag = key.indexOf("z") !== -1;

    console.log("key===", key);
    // rotateAnimation
    const rotateAnimationFlag = key.indexOf("rotateAnimation") !== -1;

    if (target) {
      if (positionFlag) {
        const x = xFlag ? value : target.position.x;
        const y = yFlag ? value : target.position.y;
        const z = zFlag ? value : target.position.z;
        target.position.set(x, y, z);
      }

      if (scaleFlag) {
        const x = xFlag ? value : target.scale.x;
        const y = yFlag ? value : target.scale.y;
        const z = zFlag ? value : target.scale.z;
        target.scale.set(x, y, z);
      }

      if (rotationFlag) {
        const x = xFlag ? value : target.rotation.x;
        const y = yFlag ? value : target.rotation.y;
        const z = zFlag ? value : target.rotation.z;
        target.rotation.x = (Math.PI / 180) * x;
        target.rotation.y = (Math.PI / 180) * y;
        target.rotation.z = (Math.PI / 180) * z;
      }

      if (visibleFlag) {
        target.visible = value;
      }

      if (rotateAnimationFlag) {
        // target.userData.
        // 判断是否是修改坐标
        const xyzFlag = xFlag || yFlag || zFlag;
        const keys = key.split(".");
        if (xyzFlag) {
          target.userData.rotateAnimation[keys[1]][keys[2]] = value;
        } else {
          // debugger
          target.userData.rotateAnimation[keys[1]] = value;
        }
      }
    }
  };

  // 改变模型数据状态
  const onChangeModelPropertyState = (key, value) => {
    setModelPropertyState((preState) => {
      const newState = cloneDeep(preState);
      setNestedPropertyValue(key, value, newState);
      return newState;
    });
    // 改变target模型属性
    onChangeModelProperty(key, value);
  };

  const onChangeTransformControls = useCallback((e) => {
    if (e.target.object) {
      const position = JSON.parse(JSON.stringify(e.target.object.position));
      const scale = JSON.parse(JSON.stringify(e.target.object.scale));
      const rotation = {
        x: (e.target.object.rotation.x * 180) / Math.PI,
        y: (e.target.object.rotation.y * 180) / Math.PI,
        z: (e.target.object.rotation.z * 180) / Math.PI,
      };
      setModelPropertyState((preState) => {
        const newState = cloneDeep(preState);
        newState.position = position;
        newState.scale = scale;
        newState.rotation = rotation;
        return newState;
      });
    }
  }, []);

  // 设置右侧面板数据状态
  const setModelProperty = (model) => {
    // 基础属性
    const visible = model.visible;
    const position = model.position;
    const scale = model.scale;
    const rotation = {
      x: (model.rotation.x * 180) / Math.PI,
      y: (model.rotation.y * 180) / Math.PI,
      z: (model.rotation.z * 180) / Math.PI,
    };

    setModelPropertyState((preState) => {
      return {
        visible,
        position,
        scale,
        rotation,
      };
    });
  };

  return {
    onChangeModelPropertyState,
    onChangeTransformControls,
    setModelProperty,
  };
};
