import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./app.scss";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import RootRouter from "@/routes";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <RootRouter />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
