import { useRef, useEffect, useCallback,memo } from "react";
import './index.scss'
const App = ({ activeMesh }) => {
  return (
    <div className="right-controller-panel" id="right-111" onClick={(event) => {
      event.stopPropagation()
      event.preventDefault()
    }}>
      1122{activeMesh?.uuid}
    </div>
  );
};

export default memo(App);
