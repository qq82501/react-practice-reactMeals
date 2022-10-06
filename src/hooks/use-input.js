import { useState } from "react";

function useInput(validator) {
  const [inputValue, setInputValue] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);

  const isInputValueValid = validator(inputValue);
  const hasError = !isInputValueValid && isInputTouched;

  const inputChangeHandler = function (e) {
    setInputValue(e.target.value);
  };

  const inputBlurHandler = function () {
    setIsInputTouched(true);
  };

  const reset = function () {
    setInputValue("");
    setIsInputTouched(false);
  };

  return {
    inputValue,
    isInputValueValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
}

export default useInput;
