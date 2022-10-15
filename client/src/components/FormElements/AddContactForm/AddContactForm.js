import React, { useEffect } from 'react';
import moment from 'moment';
import useForm from '../../../hooks/form-hook';
import useUpload from '../../../hooks/upload-hook';
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
  const { id: contactId } = useParams();

  // Http custom hook
  const { sendRequest: getData } = useHttp();

  const {
    sendRequest: postData,
    postReqSuccess,
    isError: postReqHasError,
  } = useHttp();

  const {
    sendRequest: patchData,
    patchReqSuccess,
    isError: patchReqHasError,
  } = useHttp();

  // Form custom hook
  const {
    file: imageFile,
    previewUrl: imagePreviewUrl,
    setPreviewUrl: setImagePrevieUrl,
    fileIsValid: imageIsValid,
    filePickedHandler,
    pickImageHandler,
    filePickerRef,
    resetFile: resetImage,
  } = useUpload();

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
      const { photo, firstName, lastName, phone, email, dateOfBirth, address } =
        data.data.contact;

      const birthDate = moment(dateOfBirth).format('YYYY-MM-DD');

      setImagePrevieUrl(`http://localhost:3000/contacts/${photo}`);
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
    setImagePrevieUrl,
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
    formData.append('address', enteredAddress);
    formData.append('phone', enteredPhone);
    formData.append('email', enteredEmail);

    // for (const values of formData.values()) {
    //   console.log(values);
    // }

    const receiveData = (data) => {
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
      patchData(
        {
          url: `http://localhost:3000/api/v1/contacts/${contactId}`,
          method: 'PATCH',
          body: formData,
        },
        receiveData
      );

      return;
    }

    postData(
      {
        url: 'http://localhost:3000/api/v1/contacts',
        method: 'POST',
        body: formData,
      },
      receiveData
    );
  };

  return (
    <React.Fragment>
      {postReqHasError && <ToastBar type="error" message={postReqHasError} />}
      {patchReqHasError && <ToastBar type="error" message={patchReqHasError} />}
      {postReqSuccess && (
        <ToastBar type="success" message="contact is added successfully" />
      )}
      {patchReqSuccess && (
        <ToastBar type="success" message="contact is updated successfully" />
      )}
      <form onSubmit={formSubmissionHandler}>
        <div className="form-control__container">
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
              disabled={!formIsValid}
            >
              Save Contact
            </Button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddContactForm;
