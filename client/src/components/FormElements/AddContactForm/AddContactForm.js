import React, { useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

import useForm from '../../../hooks/form-hook';
import useHttp from '../../../hooks/http-hook';
import ImageUpload from './../ImageUpload/ImageUpload';
import Input from './../Input/Input';
import './AddContactForm.scss';
import { useParams } from 'react-router-dom';
import Button from '../../../utils/Button/Button';
import ToastBar from '../../../utils/ToastBar/ToastBar';

const textValidate = (value) => value.trim() !== '';
const emailValidate = (value) => value.includes('@');
const phoneValidate = (value) =>
  value.trim().length >= 10 && value.trim().length <= 13;

const AddContactForm = () => {
  const { sendRequest: getData } = useHttp();
  const { sendRequest: postData } = useHttp();
  const { sendRequest: updateData } = useHttp();

  const error = useSelector((state) => state.ui.error);
  const requestSuccess = useSelector((state) => state.ui.requestIsSuccess);
  const toastMessage = useSelector((state) => state.ui.toastMessage);

  const { id: contactId } = useParams();

  const {
    file: imageFile,
    previewUrl: imagePreviewUrl,
    fileIsValid: imageIsValid,
    filePickedHandler,
    pickImageHandler,
    filePickerRef,
    resetFile: resetImage,
  } = useForm();

  const {
    value: enteredFirstName,
    setEnteredValue: setEnteredFirstName,
    valueChangeHandler: firstNameChangedHandler,
    valueBlurHandler: firstNameBlurHandler,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    reset: firstNameReset,
  } = useForm(textValidate);

  const {
    value: enteredLastName,
    setEnteredValue: setEnteredLastName,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    reset: lastNameReset,
  } = useForm(textValidate);

  const {
    value: enteredDate,
    setEnteredValue: setEnteredDate,
    valueChangeHandler: dateChangeHandler,
    reset: dateReset,
  } = useForm();

  const {
    value: enteredEmail,
    setEnteredValue: setEnteredEmail,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    isValid: emailIsValid,
    reset: emailReset,
  } = useForm(emailValidate);

  const {
    value: enteredPhone,
    setEnteredValue: setEnteredPhone,
    valueChangeHandler: phoneChangeHandler,
    valueBlurHandler: phoneBlurHandler,
    hasError: phoneHasError,
    isValid: phoneIsValid,
    reset: phoneReset,
  } = useForm(phoneValidate);

  const {
    value: enteredAddress,
    setEnteredValue: setEnteredAddress,
    valueChangeHandler: addressChangeHandler,
    reset: addressReset,
  } = useForm();

  useEffect(() => {
    if (!contactId) return;

    console.log('form useEffect');
    const applyGetData = (data) => {
      const { firstName, lastName, phone, email, dateOfBirth, address } =
        data.data.contact;

      const birthDate = moment(dateOfBirth).format('YYYY-MM-DD');

      setEnteredFirstName(firstName);
      setEnteredLastName(lastName);
      setEnteredPhone(phone);
      setEnteredEmail(email);
      setEnteredDate(birthDate === 'Invalid date' ? '' : birthDate);
      setEnteredAddress(address);
    };

    getData(
      {
        url: `http://localhost:3000/api/v1/contacts/${contactId}`,
      },
      applyGetData
    );
  }, [
    contactId,
    getData,
    setEnteredFirstName,
    setEnteredLastName,
    setEnteredPhone,
    setEnteredEmail,
    setEnteredDate,
    setEnteredAddress,
  ]);

  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid && phoneIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const formData = new FormData();

    formData.append('photo', imageFile);
    formData.append('firstName', enteredFirstName);
    formData.append('lastName', enteredLastName);
    formData.append('dateOfBirth', enteredDate);
    formData.append('phone', enteredPhone);
    formData.append('email', enteredEmail);
    formData.append('address', enteredAddress);

    // for (const values of formData.values()) {
    //   console.log(values);
    // }

    console.log(formData.values());
    console.log(enteredDate);

    const applyPostData = (data) => {
      console.log(data);
      if (data.status === 'success') {
        resetImage();
        firstNameReset();
        lastNameReset();
        emailReset();
        dateReset();
        phoneReset();
        addressReset();
      }
    };

    if (contactId) {
      console.log(contactId);
      updateData(
        {
          url: `http://localhost:3000/api/v1/contacts/${contactId}`,
          method: 'PATCH',
          body: formData,
        },
        applyPostData
      );

      return;
    }

    postData(
      {
        url: 'http://localhost:3000/api/v1/contacts',
        method: 'POST',
        body: formData,
      },
      applyPostData
    );
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      {error && <ToastBar type="error" message={error} />}
      {requestSuccess && <ToastBar type="success" message={toastMessage} />}

      <dir className="form-control__container">
        <ImageUpload
          className="form-control__image--upload"
          inputRef={filePickerRef}
          inputOnChange={filePickedHandler}
          imgSrc={imagePreviewUrl}
          buttonOnClick={pickImageHandler}
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
            disabled={!formIsValid}
          />
        </div>
      </dir>
    </form>
  );
};

export default AddContactForm;
