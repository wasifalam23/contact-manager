import React from 'react';
import './Input.scss';

const Input = (props) => {
  return (
    <div className="input__box">
      <label className="input__label" htmlFor={props.id}>
        {props.label}
      </label>
      <input className="input__input" id={props.id} type={props.type} />
    </div>
  );
};

export default Input;
