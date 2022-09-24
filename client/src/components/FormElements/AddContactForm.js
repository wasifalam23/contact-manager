import React from 'react';
import ImageUpload from './ImageUpload/ImageUpload';
import Input from './Input/Input';
import './AddContactForm.scss';
import Button from '../../utils/Button/Button';

const AddContactForm = () => {
  return (
    <form>
      <dir className="form-control__container">
        <ImageUpload className="form-control__image--upload" />
        <div className="form-control__input--holders">
          <div className="form-control__left">
            <Input id="first-name" label="Frist Name" type="text" />
            <Input id="last-name" label="Last Name" type="text" />
            <Input id="birth-date" label="Date Of Birth" type="date" />
          </div>

          <div className="form-control__right">
            <Input id="email" label="Email" type="email" />
            <Input id="phone" label="Phone No." type="text" />
            <Input id="address" label="Address" type="text" />
          </div>
          <Button className="form-control__save--btn" btnText="Save Contact" />
        </div>
      </dir>
    </form>
  );
};

export default AddContactForm;
