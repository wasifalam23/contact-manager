import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

import { createPortal } from 'react-dom';

import './ToastBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToastNotification = (props) => {
  const [isError, setIsError] = useState(false);

  const loading = props.type === 'loading' && (
    <div className="toast-bar__container toast-bar__loading">
      <h3 className="toast-bar__loading--text">Loading...</h3>
    </div>
  );

  let error = props.type === 'error' && (
    <div className="toast-bar__container toast-bar__error">
      <FontAwesomeIcon
        className="toast-bar__error--icon"
        icon={faExclamationCircle}
      />
      <p className="toast-bar__error--text">{props.errorMsg}</p>
    </div>
  );

  let success = props.type === 'success' && (
    <div className="toast-bar__container toast-bar__success">
      <FontAwesomeIcon
        className="toast-bar__success--icon"
        icon={faCheckCircle}
      />
      <p className="toast-bar__success--text">{props.successMsg}</p>
    </div>
  );

  return (
    <React.Fragment>
      {loading}
      {error}
      {success}
    </React.Fragment>
  );
};

const ToastBar = (props) => {
  return (
    <React.Fragment>
      {createPortal(
        <ToastNotification
          type={props.type}
          errorMsg={props.errorMsg}
          successMsg={props.successMsg}
        />,
        document.getElementById('toast-root')
      )}
    </React.Fragment>
  );
};

export default ToastBar;
