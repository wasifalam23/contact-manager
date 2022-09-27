import React from 'react';
import './Container.scss';
import Button from '../Button/Button';

const Container = (props) => {
  return (
    <div className={`container ${props.containerClass}`}>
      <header className="container__header">
        <h3 className="container__header--title">{props.title}</h3>
        {props.otherEl && props.otherEl}
      </header>
      <main className={`container__content ${props.contentClass}`}>
        {props.children}
      </main>
    </div>
  );
};

export default Container;
