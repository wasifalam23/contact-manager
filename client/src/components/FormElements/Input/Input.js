import React from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Input.scss';

const Input = (props) => {
  const inputClass = props.inputHasError
    ? 'input__box input__box--invalid'
    : 'input__box';

  return (
    <div className={inputClass}>
      <label className="input__label" htmlFor={props.id}>
        {props.label}
        {props.inputRequired && <span className="input__required">*</span>}
      </label>
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.inputHasError && (
        <p className="input__error--msg">
          <FontAwesomeIcon
            className="input__error--icon"
            icon={faExclamationTriangle}
          />
          {props.errorMsg}
        </p>
      )}
    </div>
  );
};

export default Input;
