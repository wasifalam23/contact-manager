import React from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer, Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './ToastBar.scss';

const ToastBar = (props) => {
  return (
    <React.Fragment>
      {createPortal(
        <ToastContainer
          position="top-center"
          autoClose={3000}
          transition={Slide}
          limit="2"
        />,
        document.getElementById('toast-root')
      )}
    </React.Fragment>
  );
};

export default ToastBar;
