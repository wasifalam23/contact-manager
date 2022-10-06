import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import { uiActions } from '../../store/ui-slice';
import 'react-toastify/dist/ReactToastify.css';

// import './ToastBar.scss';

const Toastify = (props) => {
  console.log('toastify running');
  const dispatch = useDispatch();

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
  }, [props.type, props.message, dispatch]);

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
