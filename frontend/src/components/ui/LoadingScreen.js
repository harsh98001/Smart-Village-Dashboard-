import React from "react";
import { h } from "../../utils/h";

const LoadingScreen = ({ active }) =>
  active
    ? h("div", { className: "loading-screen" }, [
        h("div", { key: "ring", className: "loading-ring" }),
        h("span", { key: "label", className: "loading-label" }, "Syncing dashboard intelligence")
      ])
    : null;

export default LoadingScreen;

