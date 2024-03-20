import { useRef, useEffect, useCallback, useState } from "react";
import * as THREE from "three";
import {
  SphereGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
} from "three";

export const useArrowHelper = ({ scence }) => {
  let arrowHelperX = useRef(null);
  let arrowHelperY = useRef(null);
  let arrowHelperZ = useRef(null);

  const initArrowHelper = useCallback(() => {
    const dirX = new THREE.Vector3(1, 0, 0);
    const dirY = new THREE.Vector3(0, 1, 0);
    const dirZ = new THREE.Vector3(0, 0, 1);
    dirX.normalize();
    dirY.normalize();
    dirZ.normalize();
    const origin = new THREE.Vector3(2, 2, 2);

    // 箭头的长度。默认值为1
    const length = 10;

    // 箭头颜色
    const hexX = 0xea3323;
    const hexY = 0x75fb4c;
    const hexZ = 0x0000f5;

    // 箭头长度。默认值为0.2 *length
    const headLength = 0.2 * length;

    // 箭头宽度的长度。默认值为0.2 * headLength。
    const headWidth = 0.2 * headLength;

    arrowHelperX.current = new THREE.ArrowHelper(
      dirX,
      origin,
      length,
      hexX,
      headLength,
      headWidth
    );
    arrowHelperY.current = new THREE.ArrowHelper(
      dirY,
      origin,
      length,
      hexY,
      headLength,
      headWidth
    );
    arrowHelperZ.current = new THREE.ArrowHelper(
      dirZ,
      origin,
      length,
      hexZ,
      headLength,
      headWidth
    );
    // arrowHelperX.current.visible = false;
    // arrowHelperY.current.visible = false;
    // arrowHelperZ.current.visible = false;
    console.log(arrowHelperX.current.line.material);
    arrowHelperX.current.line.material.linewidth = 100;
    scence.add(arrowHelperX.current);
    scence.add(arrowHelperY.current);
    scence.add(arrowHelperZ.current);
  }, []);

  const setArrowHelper = useCallback((mesh) => {
    // 获取当前坐标
    if (mesh === null) {
      // 隐藏
      arrowHelperX.current.visible = false;
      arrowHelperY.current.visible = false;
      arrowHelperZ.current.visible = false;
    } else {
      // 重新设置坐标
      console.log(mesh);
      const { x, y, z } = mesh.position;
      const box = new THREE.Box3().setFromObject(mesh);
      const size = new THREE.Vector3();
      box.getSize(size);
      const { x: sizeX, y: sizeY, z: sizeZ } = size;
      arrowHelperX.current.x = x;
      arrowHelperX.current.y = y;
      arrowHelperX.current.z = z;
      arrowHelperX.current.setLength(10);
      console.log(arrowHelperX.current);
    }
  }, []);

  useEffect(() => {
    // initArrowHelper();
  }, []);

  return { initArrowHelper, setArrowHelper };
};
