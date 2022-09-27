import { useContext } from "react";
import Context from "../../store/context";

import styles from "./Modal.module.css";
import List from "../UI/List";
import CartItem from "./CartItem";
import Button from "../UI/Button";

function Modal(props) {
  const context = useContext(Context);

  const orderHandler = function () {
    console.log("Ordering...");
  };
  return (
    <div className={`modal`} onClick={props.onModalClose}>
      <List className={styles.container__modal_list}>
        {context.cartItems.map((item) => (
          <CartItem
            key={item.itemNo}
            itemNo={item.itemNo}
            name={item.name}
            price={item.price}
            amount={item.amount}
          />
        ))}
        {!context.cartItems.length && (
          <div className={styles.empty_cart__message}>
            Your Shopping Cart is Empty.
          </div>
        )}
        <div
          className={context.cartItems.length ? styles.cart_total : "hidden"}
        >
          <p>Total Amount</p>
          <p>
            $
            {context.cartItems
              .reduce((acc, cur, i) => {
                return (acc += cur.price * cur.amount);
              }, 0)
              .toFixed(2)}
          </p>
        </div>
        <div className={styles.modal__btn_box}>
          <Button
            className={`${styles.btn__modal} btn__modal_close`}
            onClick={props.onModalClose}
          >
            Close
          </Button>
          <Button
            className={`${styles.btn__modal} ${styles.btn__modal_order} ${
              !context.cartItems.length && "hidden"
            }`}
            onClick={orderHandler}
          >
            Order
          </Button>
        </div>
      </List>
    </div>
  );
}

export default Modal;
