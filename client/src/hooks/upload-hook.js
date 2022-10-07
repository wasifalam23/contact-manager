import { useState, useEffect, useRef } from 'react';

const useUpload = () => {
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
    file,
    previewUrl,
    setPreviewUrl,
    fileIsValid,
    filePickerRef,
    filePickedHandler,
    pickImageHandler,
    resetFile,
  };
};

export default useUpload;
