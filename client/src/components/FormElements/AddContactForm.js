import React from 'react';

import useForm from '../../hooks/form-hook';
import ImageUpload from './ImageUpload/ImageUpload';
import Input from './Input/Input';
import './AddContactForm.scss';
import Button from '../../utils/Button/Button';

const nameValidate = (value) => value !== '';

const AddContactForm = () => {
  const {
    value: enteredFirstName,
    valueChangeHandler: firstNameChangedHandler,
    valueBlurHandler: firstNameBlurHandler,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    reset: fristNameReset,
  } = useForm(nameValidate);

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (!firstNameIsValid) {
      return;
    }

    console.log(enteredFirstName);
    fristNameReset();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <dir className="form-control__container">
        <ImageUpload className="form-control__image--upload" />
        <div className="form-control__input--holders">
          <div className="form-control__left">
            <Input
              id="first-name"
              label="First Name"
              type="text"
              value={enteredFirstName}
              onChange={firstNameChangedHandler}
              onBlur={firstNameBlurHandler}
              inputHasError={firstNameHasError}
            />
            <Input id="last-name" label="Last Name" type="text" />
            <Input id="birth-date" label="Date Of Birth" type="date" />
          </div>

          <div className="form-control__right">
            <Input id="email" label="Email" type="email" />
            <Input id="phone" label="Phone No." type="text" />
            <Input id="address" label="Address" type="text" />
          </div>
          <Button
            type="submit"
            className="form-control__save--btn"
            btnText="Save Contact"
          />
        </div>
      </dir>
    </form>
  );
};

export default AddContactForm;
