import React from 'react';
import { createPortal } from 'react-dom';

import './ToastBar.scss';

const Notification = (props) => {
  return (
    <div className="toast-bar__container">
      {props.type === 'loading' && (
        <h3 className="toast-bar__loading--text">Loading...</h3>
      )}
    </div>
  );
};

const ToastBar = (props) => {
  return (
    <React.Fragment>
      {createPortal(
        <Notification type={props.type} />,
        document.getElementById('toast-root')
      )}
    </React.Fragment>
  );
};

export default ToastBar;
