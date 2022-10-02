import { useState, useEffect, useRef } from 'react';

const useForm = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [fileIsValid, setFileIsValid] = useState(false);

  const filePickerRef = useRef();

  // Image Files
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

  const valueIsValid = validateValue && validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const valueBlurHandler = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  const filePickedHandler = (e) => {
    let pickedFile;

    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setFileIsValid(true);
    } else {
      setFileIsValid(false);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const resetFile = () => {
    setFile();
    setPreviewUrl();
  };

  return {
    value: enteredValue,
    setEnteredValue,
    valueChangeHandler,
    isValid: valueIsValid,
    hasError,
    valueBlurHandler,
    reset,
    file,
    previewUrl,
    fileIsValid,
    filePickerRef,
    filePickedHandler,
    pickImageHandler,
    resetFile,
  };
};

export default useForm;
