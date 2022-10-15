import React, { useState } from 'react';
import useForm from '../../../hooks/form-hook';
import Button from '../../../utils/Button/Button';
import Input from '../Input/Input';
import './AuthForm.scss';

const emailValidate = (value) => value.includes('@');
const passwordValidate = (value) => value.trim().length >= 8;

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    value: enteredEmail,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    isValid: emailIsValid,
    reset: emailReset,
  } = useForm(emailValidate);

  const {
    value: enteredPassword,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    reset: passwordReset,
  } = useForm(passwordValidate);

  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <section className="auth-form__main--container">
      <h2 className="auth-form__heading">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form>
        <div className="auth-form__form--control">
          {!isLogin && <Input placeholder="Name" />}
          <Input
            placeholder="Email"
            id="email"
            type="text"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            inputHasError={emailHasError}
            errorMsg="Invalid email address."
          />
          <Input
            placeholder="Password"
            id="password"
            type="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            inputHasError={passwordHasError}
            errorMsg="Password should be atlease 8 characters long"
          />
          {!isLogin && <Input placeholder="Confirm Password" />}
        </div>

        <Button type="submit" className="auth-form__submit--btn">
          Login
        </Button>

        <div className="auth-form__log-sign--mode">
          <button
            type="button"
            className="auth-form__log-sign--btn"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new Account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
