import { useState } from "react";
import { useRef, useEffect, useCallback, memo } from "react";
import "./index.scss";

const TreeItem = memo(
  ({ mesh, onSelect, initOpen = false, activeuuid, userData, deep }) => {
    const { name, uuid, children } = mesh;
    const { modelName } = userData;
    const [open, setOpen] = useState(initOpen);

    return (
      <div className="mytree-item">
        <div className="my-tree-title-container">
          <>
            {children.length > 0 ? (
              <div
                className="icon icon-common"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen((preState) => {
                    return !preState;
                  });
                }}
              >
                {open ? "-" : "+"}
              </div>
            ) : (
              <div className="icon-placeholder icon-common"></div>
            )}
          </>

          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (deep === 1) {
                onSelect(mesh);
              }
            }}
            className={`title ${activeuuid === uuid ? "active-title" : ""}`}
          >
            {modelName || name || uuid}
          </div>
        </div>
        <div className="my-tree-children-container">
          {open &&
            children.length > 0 &&
            children.map((item) => {
              return (
                <TreeItem
                  mesh={item}
                  userData={{}}
                  key={item.uuid}
                  onSelect={onSelect}
                  activeuuid={activeuuid}
                  deep={deep + 1}
                />
              );
            })}
        </div>
      </div>
    );
  }
);

const App = memo(({ treeData, onSelect, activeuuid }) => {
  return (
    <div
      className="my-tree-out-container"
      onClick={() => {
        onSelect(null);
      }}
    >
      <div className="my-tree-inner-container">
        {treeData.length > 0 &&
          treeData.map((item) => {
            return (
              item.mesh && (
                <TreeItem
                  mesh={item.mesh.scene}
                  userData={item.userData}
                  key={item.mesh.scene.uuid}
                  onSelect={onSelect}
                  activeuuid={activeuuid}
                  deep={1}
                />
              )
            );
          })}
      </div>
    </div>
  );
});

export default App;
