import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

import { createPortal } from 'react-dom';

import './ToastBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToastNotification = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(uiActions.hideToastBar());
    }, 4000);
  }, [dispatch]);

  const loadingToast = (
    <div className="toast-bar__container toast-bar__loading">
      <div className="toast-bar__loading--spinner"></div>
      <p className="toast-bar__loading--text">{props.message}</p>
    </div>
  );

  const errorToast = (
    <div className="toast-bar__container toast-bar__error">
      <FontAwesomeIcon
        className="toast-bar__error--icon"
        icon={faExclamationCircle}
      />
      <p className="toast-bar__error--text">{props.message}</p>
    </div>
  );

  const successToast = (
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
      {props.type === 'loading' && loadingToast}
      {props.type === 'error' && errorToast}
      {props.type === 'success' && successToast}
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
