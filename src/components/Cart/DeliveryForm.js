import React, { useRef, useContext } from "react";
import Context from "../../store/context";
import useInput from "../../hooks/use-input";
import Button from "../UI/Button";
import Input from "../UI/Input";
import styles from "./DeliveryForm.module.css";

const DeliveryForm = (props) => {
  const context = useContext(Context);
  const refNameInput = useRef();
  const deliveryValidator = function (text) {
    return text.trim() !== "";
  };

  // for name input
  const {
    inputValue: name,
    isInputValueValid: isNameValid,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(deliveryValidator);

  // for street input
  const {
    inputValue: street,
    isInputValueValid: isStreetValid,
    hasError: streetHasError,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput(deliveryValidator);
  const {
    inputValue: postalCode,
    isInputValueValid: isPostalCodeValid,
    hasError: postalCodeHasError,
    inputChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: postalCodeReset,
  } = useInput(deliveryValidator);
  const {
    inputValue: city,
    isInputValueValid: isCityValid,
    hasError: cityHasError,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput(deliveryValidator);

  const isFormValid =
    isStreetValid && isNameValid && isPostalCodeValid && isCityValid;

  const sendOrder = async function (order) {
    const res = await fetch(
      "https://reactmeals-c7491-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );
    const data = await res.json();
    if (!data) return;
    console.log(
      `Thank you ${order.deliveryInfo.name.toUpperCase()}, we received your order!`
    );
  };

  const orderHandler = function (e) {
    e.preventDefault();
    if (!isFormValid) return;
    const orderContent = [];
    props.cartItems.forEach((item) => orderContent.push(item.props));
    const order = {
      deliveryInfo: { name, street, postalCode, city },
      meals: orderContent,
      amount: context.orderAmount,
      totalPrice: props.totalAmount,
    };
    sendOrder(order);
    const successMsg = (
      <React.Fragment>
        <p>{`Thank you ${name.toUpperCase()},`}</p>
        <p>We got the order.</p>
      </React.Fragment>
    );
    props.onSubmitComplete(successMsg);
    context.onReset();
    refNameInput.current.focus();
    nameReset();
    streetReset();
    cityReset();
    postalCodeReset();
  };
  return (
    <form className={styles.container} onSubmit={orderHandler}>
      <div className={styles.input_box}>
        <Input
          labelClass={styles.label}
          inputClass={styles.input}
          labelName="Your Name"
          hasError={nameHasError}
          errMessage="(Input can not be empty!)"
          ref={refNameInput}
          input={{
            id: "name",
            onChange: nameChangeHandler,
            onBlur: nameBlurHandler,
            value: name,
          }}
        />
        <Input
          labelClass={styles.label}
          inputClass={styles.input}
          labelName="Street"
          hasError={streetHasError}
          errMessage="(Input can not be empty!)"
          input={{
            id: "street",
            onChange: streetChangeHandler,
            onBlur: streetBlurHandler,
            value: street,
          }}
        />
        <Input
          labelClass={styles.label}
          inputClass={styles.input}
          labelName="Postal code"
          hasError={postalCodeHasError}
          errMessage="(Input can not be empty!)"
          input={{
            id: "postal-code",
            onChange: postalCodeChangeHandler,
            onBlur: postalCodeBlurHandler,
            value: postalCode,
            type: "number",
          }}
        />
        <Input
          labelClass={styles.label}
          inputClass={styles.input}
          labelName="City"
          hasError={cityHasError}
          errMessage="(Input can not be empty!)"
          input={{
            id: "city",
            onChange: cityChangeHandler,
            onBlur: cityBlurHandler,
            value: city,
          }}
        />
      </div>
      <div className={styles.btn_box}>
        <Button
          className="btn__modal_close"
          type="button"
          onClick={context.onModalClose}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!isFormValid}>
          Comfirm
        </Button>
      </div>
    </form>
  );
};

export default DeliveryForm;
