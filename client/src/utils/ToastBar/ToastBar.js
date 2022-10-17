import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { contactActions } from '../../store/contact-slice';
import { createPortal } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Toastify = (props) => {
  console.log('toastify');
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.type === 'error') {
      toast.error(props.message, {
        position: 'top-center',
      });
    }

    if (props.type === 'success') {
      dispatch(contactActions.setReqHasChanged());

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
