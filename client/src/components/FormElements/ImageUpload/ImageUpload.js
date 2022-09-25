import React, { useRef, useState, useEffect } from 'react';
import Button from '../../../utils/Button/Button';
import './ImageUpload.scss';

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={`image-upload__container ${props.className}`}>
      <input
        id={props.id}
        type="file"
        style={{ display: 'none' }}
        accept=".jpg,.jpeg,.png"
        ref={filePickerRef}
        onChange={pickedHandler}
      />

      <div className="image-upload__content">
        <div className="image-upload__preview">
          {previewUrl && (
            <img
              className="image-upload__image"
              src={previewUrl}
              alt="preview"
            />
          )}
          {!previewUrl && (
            <p className="image-upload__alter-text">Pick an Image</p>
          )}
        </div>
        <Button
          className="image-upload__btn"
          type="button"
          btnText="Upload Photo"
          onClick={pickImageHandler}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
