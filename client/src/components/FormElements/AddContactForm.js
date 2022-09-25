import React, { useState } from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useForm from '../../hooks/form-hook';
import ImageUpload from './ImageUpload/ImageUpload';
import Input from './Input/Input';
import './AddContactForm.scss';
import Button from '../../utils/Button/Button';

const textValidate = (value) => value.trim() !== '';
const emailValidate = (value) => value.includes('@');
const phoneValidate = (value) =>
  value.trim().length >= 10 && value.trim().length <= 13;

const AddContactForm = () => {
  const [imageFile, setImageFile] = useState();

  const {
    value: enteredFirstName,
    valueChangeHandler: firstNameChangedHandler,
    valueBlurHandler: firstNameBlurHandler,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    reset: fristNameReset,
  } = useForm(textValidate);

  const {
    value: enteredLastName,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    reset: lastNameReset,
  } = useForm(textValidate);

  const {
    value: enteredDate,
    valueChangeHandler: dateChangeHandler,
    reset: dateReset,
  } = useForm(textValidate);

  const {
    value: enteredEmail,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    isValid: emailIsValid,
    reset: emailReset,
  } = useForm(emailValidate);

  const {
    value: enteredPhone,
    valueChangeHandler: phoneChangeHandler,
    valueBlurHandler: phoneBlurHandler,
    hasError: phoneHasError,
    isValid: phoneIsValid,
    reset: phoneReset,
  } = useForm(phoneValidate);

  const {
    value: enteredAddress,
    valueChangeHandler: addressChangeHandler,
    reset: addressReset,
  } = useForm(textValidate);

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid && phoneIsValid) {
    formIsValid = true;
  }

  const imageUploadHandler = (imgFile, isValid) => {
    setImageFile(imgFile);
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const data = {
      image: imageFile,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      dateOfBirth: enteredDate,
      email: enteredEmail,
      phone: enteredPhone,
      address: enteredAddress,
    };

    console.log(data);

    setImageFile();
    fristNameReset();
    lastNameReset();
    emailReset();
    dateReset();
    phoneReset();
    addressReset();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <dir className="form-control__container">
        <ImageUpload
          className="form-control__image--upload"
          onInput={imageUploadHandler}
          id="image"
        />
        <div className="form-control__input--holders">
          {/* {
            <p className="form-control__input-required--text">
              <FontAwesomeIcon
                className="input__error--icon"
                icon={faExclamationTriangle}
              />
              Please fill out the required fields.
            </p>
          } */}
          <div className="form-control__left">
            <Input
              id="first-name"
              label="First Name"
              type="text"
              inputRequired
              value={enteredFirstName}
              onChange={firstNameChangedHandler}
              onBlur={firstNameBlurHandler}
              inputHasError={firstNameHasError}
              errorMsg="First Name must not be empty."
            />
            <Input
              id="last-name"
              label="Last Name"
              type="text"
              inputRequired
              value={enteredLastName}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              inputHasError={lastNameHasError}
              errorMsg="Last Name must not be empty."
            />
            <Input
              id="birth-date"
              label="Date of Birth"
              type="date"
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </div>
          <div className="form-control__right">
            <Input
              id="email"
              label="Email"
              type="email"
              inputRequired
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              inputHasError={emailHasError}
              errorMsg="Invalid email Address."
            />
            <Input
              id="phone"
              label="Phone"
              type="text"
              inputRequired
              value={enteredPhone}
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
              inputHasError={phoneHasError}
              errorMsg="Enter a valid phone no. within 10 to 13 characters."
            />
            <Input
              id="address"
              label="Address"
              type="text"
              value={enteredAddress}
              onChange={addressChangeHandler}
            />
          </div>
          <Button
            type="submit"
            className="form-control__save--btn"
            btnText="Save Contact"
            disabled={!formIsValid}
          />
        </div>
      </dir>
    </form>
  );
};

export default AddContactForm;
