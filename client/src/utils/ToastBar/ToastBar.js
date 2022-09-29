import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

import { createPortal } from 'react-dom';

import './ToastBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToastNotification = (props) => {
  // const [isError, setIsError] = useState(false);

  const isLoading = useSelector((state) => state.ui.isLoading);
  const error = useSelector((state) => state.ui.error);
  const isSuccess = useSelector((state) => state.ui.isSuccess);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(uiActions.setError({ error: null }));
      dispatch(uiActions.setIsSuccess({ isSuccess: false }));
    }, 3000);
  }, [dispatch]);

  const loadingToast = isLoading && (
    <div className="toast-bar__container toast-bar__loading">
      <h3 className="toast-bar__loading--text">{props.message}</h3>
    </div>
  );

  const errorToast = error && (
    <div className="toast-bar__container toast-bar__error">
      <FontAwesomeIcon
        className="toast-bar__error--icon"
        icon={faExclamationCircle}
      />
      <p className="toast-bar__error--text">{props.message}</p>
    </div>
  );

  const successToast = isSuccess && (
    <div className="toast-bar__container toast-bar__success">
      <FontAwesomeIcon
        className="toast-bar__success--icon"
        icon={faCheckCircle}
      />
      <p className="toast-bar__success--text">{props.message}</p>
    </div>
  );

  return (
    <React.Fragment>
      {loadingToast}
      {errorToast}
      {successToast}
    </React.Fragment>
  );
};

const ToastBar = (props) => {
  return (
    <React.Fragment>
      {createPortal(
        <ToastNotification type={props.type} message={props.message} />,
        document.getElementById('toast-root')
      )}
    </React.Fragment>
  );
};

export default ToastBar;
