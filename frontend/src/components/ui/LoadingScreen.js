import React from "react";
const LoadingScreen = ({ active }) =>
  active
    ? <div className="loading-screen">
  <div key="ring" className="loading-ring" />
  <span key="label" className="loading-label">Syncing dashboard intelligence</span>
</div>
    : null;

export default LoadingScreen;

