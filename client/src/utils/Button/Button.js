import React from 'react';
import './Button.scss';

const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`button ${props.className}`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
