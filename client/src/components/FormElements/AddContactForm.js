import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import useForm from '../../hooks/form-hook';
import ImageUpload from './ImageUpload/ImageUpload';
import Input from './Input/Input';
import './AddContactForm.scss';
import Button from '../../utils/Button/Button';
import useHttp from '../../hooks/http-hook';
import ToastBar from '../../utils/ToastBar/ToastBar';

const textValidate = (value) => value.trim() !== '';
const emailValidate = (value) => value.includes('@');
const phoneValidate = (value) =>
  value.trim().length >= 10 && value.trim().length <= 13;

const AddContactForm = () => {
  const { sendRequest: postData, isLoading } = useHttp();
  const [imageFile, setImageFile] = useState();

  const error = useSelector((state) => state.ui.error);
  const isSuccess = useSelector((state) => state.ui.isSuccess);

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

    // if (!formIsValid) {
    //   return;
    // }

    const formData = new FormData();
    formData.append('photo', imageFile);
    formData.append('firstName', enteredFirstName);
    formData.append('lastName', enteredLastName);
    formData.append('dateOfBirth', enteredDate);
    formData.append('phone', enteredPhone);
    formData.append('email', enteredEmail);
    formData.append('address', enteredAddress);

    const applyPostData = (data) => {
      console.log(data);
    };

    postData(
      {
        url: 'http://localhost:3000/api/v1/contacts',
        method: 'POST',
        body: formData,
      },
      applyPostData
    );

    // setImageFile();
    // fristNameReset();
    // lastNameReset();
    // emailReset();
    // dateReset();
    // phoneReset();
    // addressReset();

    // const data = {
    //   image: imageFile,
    //   firstName: enteredFirstName,
    //   lastName: enteredLastName,
    //   dateOfBirth: enteredDate,
    //   email: enteredEmail,
    //   phone: enteredPhone,
    //   address: enteredAddress,
    // };

    // console.log(data);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      {error && <ToastBar message={error} />}
      {isSuccess && <ToastBar message="Contact added successfully" />}
      <dir className="form-control__container">
        <ImageUpload
          className="form-control__image--upload"
          onInput={imageUploadHandler}
          id="image"
        />
        <div className="form-control__input--holders">
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
            // disabled={!formIsValid}
          />
        </div>
      </dir>
    </form>
  );
};

export default AddContactForm;
