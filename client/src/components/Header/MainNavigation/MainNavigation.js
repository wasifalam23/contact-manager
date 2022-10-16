import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth-slice';

import { Link } from 'react-router-dom';
import './MainNavigation.scss';

const MainNavigation = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <nav className="main-navigation">
      <ul className="main-navigation__list">
        {!isLoggedIn && (
          <li className="main-navigation__list--item">
            <Link className="main-navigation__link" to="/auth">
              Login
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li className="main-navigation__list--item">
            <Link className="main-navigation__link" to="/">
              Contacts
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li className="main-navigation__list--item">
            <Link className="main-navigation__link" to="/addContact">
              Add Contact
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li className="main-navigation__list--item">
            <button
              onClick={logoutHandler}
              className="main-navigation__btn--logout"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
