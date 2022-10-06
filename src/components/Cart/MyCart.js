import { useContext, useRef, useState, useCallback } from "react";
import Context from "../../store/context";
import styles from "./MyCart.module.css";
import CartItem from "./CartItem";
import List from "../UI/List";
import Button from "../UI/Button";
import DeliveryForm from "./DeliveryForm";

function MyCart(props) {
  const context = useContext(Context);
  const [isFormValid, setIsFormValid] = useState(false);
  const deliveryInputRef = useRef();

  /* Helper ------------------- */
  const cartItems = context.cartItems.map((item) => (
    <CartItem
      key={item.itemNo}
      itemNo={item.itemNo}
      name={item.name}
      price={item.price}
      amount={item.amount}
    />
  ));

  const totalAmount = context.cartItems
    .reduce((acc, cur) => {
      return (acc += cur.price * cur.amount);
    }, 0)
    .toFixed(2);

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
      `Thank you ${order.recipient.toUpperCase()}, we received your order!`
    );
  };
  /* Handler ------------------- */

  const checkFormValidHandler = useCallback(function (status) {
    setIsFormValid(status);
  }, []);

  const orderHandler = function (e) {
    e.preventDefault();
    if (!isFormValid) return;
    const orderContent = [];
    cartItems.forEach((item) => orderContent.push(item.props));
    const order = {
      recipient: deliveryInputRef.current.recipient,
      address: deliveryInputRef.current.address,
      meals: orderContent,
      amount: context.orderAmount,
      totalPrice: totalAmount,
    };
    sendOrder(order);
    context.onReset();
    deliveryInputRef.current.onResetDelivery();
  };

  /* Component Return ------------------- */
  return (
    <List className={styles.container__modal_list}>
      {cartItems}
      {!context.cartItems.length && (
        <div className={styles.empty_cart__message}>
          Your Shopping Cart is Empty.
        </div>
      )}
      <div className={context.cartItems.length ? styles.cart_total : "hidden"}>
        <p>Total Amount</p>
        <p>${totalAmount}</p>
      </div>
      <form onSubmit={orderHandler}>
        {!context.orderAmount || (
          <DeliveryForm
            ref={deliveryInputRef}
            onCheckFormValid={checkFormValidHandler}
          />
        )}
        <div className={styles.modal__btn_box}>
          <Button
            className={`${styles.btn__modal} btn__modal_close`}
            onClick={props.onModalClose}
            type="button"
          >
            Close
          </Button>

          {context.cartItems.length > 0 && (
            <Button
              className={`${styles.btn__modal} ${styles.btn__modal_order}`}
              type="submit"
              disabled={!isFormValid}
            >
              Order
            </Button>
          )}
        </div>
      </form>
    </List>
  );
}
export default MyCart;
