import { useState, useEffect, useRef } from 'react';

const useForm = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

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

  return {
    value: enteredValue,
    setEnteredValue,
    valueChangeHandler,
    isValid: valueIsValid,
    hasError,
    valueBlurHandler,
    reset,
  };
};

export default useForm;
