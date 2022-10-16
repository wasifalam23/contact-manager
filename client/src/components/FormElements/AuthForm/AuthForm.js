import React, { useState } from 'react';
import './AuthForm.scss';

import SignUp from './Signup/SignUp';
import LogIn from './Login/LogIn.js';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <section className="auth-form__main--container">
      <h2 className="auth-form__heading">{isLogin ? 'Login' : 'Sign Up'}</h2>

      {isLogin ? <LogIn /> : <SignUp />}

      <div className="auth-form__log-sign--mode">
        <button
          type="button"
          className="auth-form__log-sign--btn"
          onClick={switchAuthModeHandler}
        >
          {isLogin ? 'Create new Account' : 'Login with existing account'}
        </button>
      </div>
    </section>
  );
};

export default AuthForm;
