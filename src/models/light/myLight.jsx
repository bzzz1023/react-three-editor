import MyAmbientLight from "./ambientLight";
import MyDirectionalLight from "./directionalLight";
import MyPointLight from "./pointLight";
import MySpotLight from "./spotLight";
import { useEffect, useRef, Suspense, memo } from "react";
const MyLight = memo(({ userData, setTarget, index, modelListRef }) => {
    return (
      <>
        {userData.lightKey === "directionalLight" && (
          <MyDirectionalLight
            userData={userData}
            setTarget={setTarget}
            index={index}
            modelListRef={modelListRef}
          />
        )}
        {userData.lightKey === "ambientLight" && (
          <MyAmbientLight
            userData={userData}
            setTarget={setTarget}
            index={index}
            modelListRef={modelListRef}
          />
        )}
        {userData.lightKey === "spotLight" && (
          <MySpotLight
            userData={userData}
            setTarget={setTarget}
            index={index}
            modelListRef={modelListRef}
          />
        )}
        {userData.lightKey === "pointLight" && (
          <MyPointLight
            userData={userData}
            setTarget={setTarget}
            index={index}
            modelListRef={modelListRef}
          />
        )}
      </>
    );
  });

  export default MyLight