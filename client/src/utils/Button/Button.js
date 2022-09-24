import React from 'react';
import './Button.scss';

const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`button ${props.className}`}
    >
      {props.btnText}
    </button>
  );
};

export default Button;
