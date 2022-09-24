import React from 'react';
import './Input.scss';

const Input = (props) => {
  const inputClass = props.inputHasError
    ? 'input__box input__box--invalid'
    : 'input__box';

  return (
    <div className={inputClass}>
      <label className="input__label" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
