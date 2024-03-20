import { useRef, useEffect, useCallback, useState } from "react";
import * as THREE from "three";

import { useArrowHelper } from "./useArrowHelper";

export const useController = ({
  meshList,
  camera,
  scence,
  setActiveMesh,
  page,
}) => {
  const { setArrowHelper } = useArrowHelper({ scence });

  // 监听点击模型
  const onClickMesh = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scence.children);

    if (intersects.length > 0) {
      setActiveMesh((preMesh) => {
        const selectMesh = intersects[0].object;
        if (selectMesh.uuid === preMesh?.uuid) {
          return preMesh;
        } else {
          // setArrowHelper(selectMesh);
          return selectMesh;
        }
      });
    } else {
      setActiveMesh((preMesh) => {
        // setArrowHelper(null);
        return null;
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", onClickMesh, false);

    return () => {
      document.removeEventListener("click", onClickMesh);
    };
  }, []);
};
