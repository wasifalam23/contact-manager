import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Toastify = (props) => {
  console.log('toastify running');

  useEffect(() => {
    if (props.type === 'error') {
      toast.error(props.message, {
        position: 'top-center',
      });
    }

    if (props.type === 'success') {
      toast.success(props.message, {
        position: 'top-center',
      });
    }
  }, [props.type, props.message]);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  );
};

const ToastBar = (props) => {
  return (
    <React.Fragment>
      {createPortal(
        <Toastify type={props.type} message={props.message} />,
        document.getElementById('toast-root')
      )}
    </React.Fragment>
  );
};

export default ToastBar;
