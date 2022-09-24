import React from 'react';
import ImageUpload from './ImageUpload/ImageUpload';
import './AddContactForm.scss';

const AddContactForm = () => {
  return (
    <form>
      <dir className="form-control__container">
        <ImageUpload className="form-control__image--upload" />
        <div className="form-control__input--holders">
          <div className="form-control__left">
            <input type="text" />
          </div>

          <div className="form-control__right">
            <input type="text" />
          </div>
        </div>
      </dir>
    </form>
  );
};

export default AddContactForm;
