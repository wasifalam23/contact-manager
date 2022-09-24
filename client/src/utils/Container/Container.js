import React from 'react';
import './Container.scss';
import Button from '../Button/Button';

const Container = (props) => {
  return (
    <main className="container">
      <header className="container__header">
        <h3 className="container__header--title">{props.title}</h3>
        {props.btnText && <Button btnText={props.btnText} />}
      </header>
      {props.children}
    </main>
  );
};

export default Container;
