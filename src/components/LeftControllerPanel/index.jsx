import {
  useState,
  useRef,
  useEffect,
  useMemo,
  Suspense,
  memo,
  useCallback,
} from "react";
import './index.scss'

import { Tree } from 'antd';

import MyTree from './components/MyTree'

const App = ({ meshCache, setActiveMesh }) => {


  // const setKeyTitle = (children) => {
  //   if (children.length > 0) {
  //     children.forEach((item) => {
  //       item.key = item.uuid
  //       item.title = !!item.name ? item.name : item.uuid
  //       setKeyTitle(item.children)
  //     })
  //   }
  // }
  // meshCache.forEach((item) => {
  //   item.key = item.uuid
  //   item.title = !!item.name ? item.name : item.uuid
  //   setKeyTitle(item.children)
  // })

  return (
    <div className="left-controller-panel">
      <MyTree
        treeData={meshCache}
        onSelect={(e) => {
          console.log(e);
          setActiveMesh(e)
        }}
      />
      {/* <Tree
        treeData={meshCache}
        onSelect={(e, k) => {
          console.log(e);
          console.log(k);
          delete k.node[`key`]
          delete k.node[`title`]
          setActiveMesh(k.node)
        }}
      /> */}
      {
        meshCache.length > 0 && meshCache.map((item) => {
          return (
            <div
              key={item.uuid}
              onClick={() => {
                setActiveMesh(item)
              }}>{item.uuid}</div>
          )
        })
      }
    </div>
  );
};

export default (App);
