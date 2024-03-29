import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../../store/auth-slice';

import Input from '../../Input/Input';
import Button from '../../../../utils/Button/Button';
import useForm from '../../../../hooks/form-hook';
import useHttp from '../../../../hooks/http-hook';

const nameValidate = (value) => value.trim() !== '';
const emailValidate = (value) => value.includes('@');
const passwordValidate = (value) => value.trim().length >= 8;

const SignUp = () => {
  const { sendRequest: createUser } = useHttp();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: enteredName,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    hasError: nameHasError,
    isValid: nameIsValid,
    reset: nameReset,
  } = useForm(nameValidate);

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

  const {
    value: enteredConfirmPassword,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    hasError: confirmPasswordHasError,
    isValid: confirmPasswordIsValid,
    reset: confirmPasswordReset,
  } = useForm(passwordValidate);

  let formIsValid = false;
  if (
    nameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    const signUpData = (data) => {
      if (data.status === 'success') {
        toast.success('You have successfully signed up!');
        dispatch(authActions.login(data.token));
        navigate('/', { replace: true });
      } else if (data.status === 'fail') {
        toast.error(data.message);
      }
    };

    createUser(
      {
        url: 'http://localhost:3000/api/v1/users/signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          passwordConfirm: enteredConfirmPassword,
        }),
      },
      signUpData
    );
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="auth-form__form--control">
        <Input
          placeholder="Name"
          id="name"
          type="text"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          inputHasError={nameHasError}
          errorMsg="Name must not be empty"
        />

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

        <Input
          placeholder="Confirm Password"
          id="confirm-password"
          type="password"
          value={enteredConfirmPassword}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          inputHasError={confirmPasswordHasError}
          errorMsg="Password should be altest 8 characters long"
        />

        <Button type="submit" className="auth-form__submit--btn">
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignUp;
