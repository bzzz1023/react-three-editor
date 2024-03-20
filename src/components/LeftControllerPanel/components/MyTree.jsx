import { useState } from "react";
import { useRef, useEffect, useCallback, memo } from "react";
import './index.scss'

const TreeItem = ({ node, onSelect, initOpen = false }) => {
    const { name, uuid, children } = node
    const [open, setOpen] = useState(initOpen)
    return (
        <div
            className="mytree-item"
            style={{
                paddingLeft: 10,
            }}
            onClick={(e) => {
                setOpen((preState) => {
                    return !preState
                })
                e.preventDefault()
                e.stopPropagation()
                onSelect(node)
            }}>
            <div className="my-tree-title-container">
                <div>展开</div>
                <div>{name || uuid}</div>
            </div>
            <div className="my-tree-children-container">
                {
                    open && children.length > 0 && (
                        children.map((item) => {
                            return <TreeItem node={item} key={item.uuid} onSelect={onSelect} />
                        })
                    )
                }
            </div>
        </div>
    )
}

const App = ({ treeData, onSelect }) => {

    return (
        <div className="my-tree-out-container">
        <div className="my-tree-inner-container">
            {
                treeData.length > 0 && treeData.map((item) => {
                    return <TreeItem node={item} key={item.uuid} onSelect={onSelect} />
                })
            }
        </div>
        </div>

    );
};

export default (App);
