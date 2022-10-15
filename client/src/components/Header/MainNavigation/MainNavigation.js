import React from 'react';
import { Link } from 'react-router-dom';
import './MainNavigation.scss';

const MainNavigation = () => {
  return (
    <nav className="main-navigation">
      <ul className="main-navigation__list">
        <li className="main-navigation__list--item">
          <Link className="main-navigation__link" to="/auth">
            Login
          </Link>
        </li>
        <li className="main-navigation__list--item">
          <Link className="main-navigation__link" to="/">
            Contacts
          </Link>
        </li>
        <li className="main-navigation__list--item">
          <Link className="main-navigation__link" to="/addContact">
            Add Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
