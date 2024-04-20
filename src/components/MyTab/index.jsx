import { useRef, useEffect, useCallback, memo } from "react";
import './index.scss'
import useStore from "@/store";

const App = ({ items, activeKey, onChange }) => {

    return (
        <div className="my-tabs-container">
            {
                items.length > 0 && (
                    items.map((item) => {
                        return (
                            <div key={item.key}
                                className={`my-tabs-item-container ${activeKey === item.key ? "active-tab" : ""}`}
                                onClick={() => {
                                    if (item.key !== activeKey) {
                                        onChange && onChange(item.key)
                                    }
                                }}
                            >
                                {item.label}
                            </div>
                        )
                    })
                )
            }
        </div>
    );
};

export default memo(App);
