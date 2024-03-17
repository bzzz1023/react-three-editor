import { useRef, useEffect, useCallback } from "react";
import { useThree } from "@/hooks/useThree";
import LeftControllerPanel from "@/components/LeftControllerPanel";
import RightControllerPanel from "@/components/RightControllerPanel";
import "./app.scss";

import { GetModelApi } from "@/api/file";
import { load } from "@/utils/loadModel";

const App = () => {
  const { page, scence, setScence, meshList, loadMesh } = useThree();

  const load1 = async (e) => {
    // const files = e.target.files;
    // const res = await GetModelApi(`camera.glb`);
    // console.log(res);
    // console.log(files[0]);
    // debugger
    // const map = {};
    // for (let i = 0; i < files.length; i++) {
    //   const file = e.target.files[i];
    //   map[i] = file;
    // }
    load(scence);
  };

  return (
    <div className="out-page-container">
      {/* <input type="file" onChange={load1} /> */}
      <div className="main-three-editor-container" ref={page}></div>
      {/* <LeftControllerPanel meshList={meshList} /> */}
      <RightControllerPanel />
    </div>
  );
};

export default App;
