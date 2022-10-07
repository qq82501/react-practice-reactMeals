import React, { useContext, useState, useEffect } from "react";
import Context from "../../store/context";
import styles from "./MyCart.module.css";
import CartItem from "./CartItem";
import List from "../UI/List";
import Button from "../UI/Button";
import DeliveryForm from "./DeliveryForm";
import Card from "../UI/Card";

function MyCart(props) {
  const context = useContext(Context);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const isCartEmpty = context.cartItems.length === 0;

  useEffect(() => {
    if (!isSubmitComplete) return;
    setIsDeliveryOpen(false);
  }, [isCartEmpty, isSubmitComplete]);

  /* Helper ------------------- */

  const totalAmount = context.cartItems
    .reduce((acc, cur) => {
      return (acc += cur.price * cur.amount);
    }, 0)
    .toFixed(2);

  /* Handler ------------------- */

  const deliveryFormHandler = function () {
    setIsDeliveryOpen(true);
  };

  const submitCompleteHandler = function (msg) {
    setIsSubmitComplete(true);
    setSuccessMsg(msg);
  };

  /* Content Simplify ------------------- */

  const cartItems = context.cartItems.map((item) => (
    <CartItem
      key={item.itemNo}
      itemNo={item.itemNo}
      name={item.name}
      price={item.price}
      amount={item.amount}
    />
  ));

  const cartContent = (
    <div>
      <List className={styles.cart__list}>{cartItems}</List>
      {isCartEmpty && (
        <div className={styles.empty_cart__message}>
          Your Shopping Cart is Empty.
        </div>
      )}
      <div className={context.cartItems.length ? styles.cart_total : "hidden"}>
        <p>Total Amount</p>
        <p>${totalAmount}</p>
      </div>
      <div className={styles.modal__btn_box}>
        <Button
          className={`${styles.btn__modal} btn__modal_close`}
          onClick={context.onModalClose}
          type="button"
        >
          Close
        </Button>

        {!isCartEmpty && (
          <Button
            className={`${styles.btn__modal} ${styles.btn__modal_order}`}
            type="button"
            onClick={deliveryFormHandler}
          >
            Order
          </Button>
        )}
      </div>
    </div>
  );

  const submitComplete = (
    <React.Fragment>
      <div className={styles.success__message}>{successMsg}</div>
      <div className={styles.submit_complete__btn_box}>
        <Button
          className={`${styles.btn__modal} btn__modal_close`}
          onClick={context.onModalClose}
          type="button"
        >
          Close
        </Button>
      </div>
    </React.Fragment>
  );

  const DeliveryContent = (
    <DeliveryForm
      cartItems={cartItems}
      totalAmount={totalAmount}
      onSubmitComplete={submitCompleteHandler}
    />
  );
  /* Component Return ------------------- */
  return (
    <div
      className={`${styles.container__my_cart} ${
        isDeliveryOpen && "delivery_extented"
      }`}
    >
      <Card className={styles.cart_detail}>
        {!isSubmitComplete && cartContent}
        {isSubmitComplete && submitComplete}
        <div
          className={` ${isCartEmpty && "hidden"} ${styles.mobile_form_box}`}
        >
          <Card className={styles.form_delivery__card}>
            {!context.orderAmount || DeliveryContent}
          </Card>
        </div>
      </Card>
      <div className={`${styles.form_box} ${isCartEmpty && "hidden"}`}>
        <Card className={styles.form_delivery__card}>
          {!context.orderAmount || DeliveryContent}
        </Card>
      </div>
    </div>
  );
}
export default MyCart;
