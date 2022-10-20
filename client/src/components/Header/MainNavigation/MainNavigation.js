import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth-slice';

import ConfirmModal from '../../../utils/ConfirmModal/ConfirmModal';
import './MainNavigation.scss';

const MainNavigation = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    setShowLogoutModal(true);
  };

  const logoutModalConfrimHandler = () => {
    dispatch(authActions.logout());
    setShowLogoutModal(false);
  };

  const logoutModalCancelHandler = () => {
    setShowLogoutModal(false);
  };

  return (
    <React.Fragment>
      {showLogoutModal && (
        <ConfirmModal
          title="Log out?"
          message="Are you sure you want to log out?"
          onConfirm={logoutModalConfrimHandler}
          onCancel={logoutModalCancelHandler}
        />
      )}
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
    </React.Fragment>
  );
};

export default MainNavigation;
