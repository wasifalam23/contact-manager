import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../../store/auth-slice';
import Input from '../../Input/Input';
import Button from '../../../../utils/Button/Button';
import useForm from '../../../../hooks/form-hook';
import useHttp from '../../../../hooks/http-hook';

const emailValidate = (value) => value.includes('@');
const passwordValidate = (value) => value.trim().length >= 8;

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sendRequest: loginUser } = useHttp();

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

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    const loggedInData = (data) => {
      console.log(data);
      if (data.status === 'success') {
        dispatch(authActions.login(data.token));
        navigate('/', { replace: true });
      }
    };

    loginUser(
      {
        url: 'http://localhost:3000/api/v1/users/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
      },
      loggedInData
    );
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="auth-form__form--control">
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

        <Button type="submit" className="auth-form__submit--btn">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LogIn;
