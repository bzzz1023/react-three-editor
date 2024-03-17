import { useRef, useEffect, useCallback } from "react";
import './index.scss'
const App = ({ meshList }) => {
  console.log(meshList);
  return (
    <div className="left-controller-panel">
      {
        meshList.length > 0 && (
          meshList.map((item) => {
            return (
              <div key={item.uuid}>{item.name}</div>
            )
          })
        )
      }
    </div>
  );
};

export default App;
