import React, { useRef, useImperativeHandle, useEffect } from "react";
import useInput from "../../hooks/use-input";
import Input from "../UI/Input";
import styles from "./DeliveryForm.module.css";

const DeliveryForm = React.forwardRef((props, ref) => {
  const { onCheckFormValid } = props;
  const refRecipientInput = useRef();
  const deliveryValidator = function (text) {
    return text.trim() !== "";
  };

  // for recipent input
  let {
    inputValue: recipient,
    isInputValueValid: isRecipientValid,
    hasError: recipientHasError,
    inputChangeHandler: recipientChangeHandler,
    inputBlurHandler: recipientBlurHandler,
    reset: recipentReset,
  } = useInput(deliveryValidator);

  // for address input
  let {
    inputValue: address,
    isInputValueValid: isAddressValid,
    hasError: addressHasError,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: addressReset,
  } = useInput(deliveryValidator);

  const isFormValid = isAddressValid && isRecipientValid;

  useEffect(() => {
    onCheckFormValid(isFormValid);
  }, [isFormValid, onCheckFormValid]);

  useImperativeHandle(ref, () => {
    return {
      recipient,
      address,
      onResetDelivery: () => {
        refRecipientInput.current.focus();
        recipentReset();
        addressReset();
      },
    };
  });

  return (
    <div className={styles.container}>
      <Input
        labelClass={styles.label__recipient}
        inputClass={styles.input__recipient}
        labelName="Recipient"
        hasError={recipientHasError}
        errMessage="(Input can not be empty!)"
        ref={refRecipientInput}
        input={{
          id: "Recipient",
          onChange: recipientChangeHandler,
          onBlur: recipientBlurHandler,
          value: recipient,
        }}
      />
      <Input
        labelClass={styles.label__address}
        inputClass={styles.input__address}
        labelName="Address"
        hasError={addressHasError}
        errMessage="(Input can not be empty2!)"
        input={{
          id: "address",
          onChange: addressChangeHandler,
          onBlur: addressBlurHandler,
          value: address,
        }}
      />
    </div>
  );
});

export default DeliveryForm;
