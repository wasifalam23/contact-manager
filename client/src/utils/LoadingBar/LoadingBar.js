import React from 'react';
import './LoadingBar.scss';

const LoadingBar = () => {
  return (
    <div className=" loading-bar__container">
      <div className="loading-bar__spinner"></div>
      <p className="loading-bar__text">Loading...</p>
    </div>
  );
};

export default LoadingBar;
