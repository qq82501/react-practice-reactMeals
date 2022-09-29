import { useContext } from "react";
import Context from "../../store/context";
import styles from "./MyCart.module.css";
import CartItem from "./CartItem";
import List from "../UI/List";
import Button from "../UI/Button";

function MyCart(props) {
  const context = useContext(Context);

  const orderHandler = function () {
    console.log("Ordering...");
  };

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
      <div className={styles.modal__btn_box}>
        <Button
          className={`${styles.btn__modal} btn__modal_close`}
          onClick={props.onModalClose}
        >
          Close
        </Button>
        {context.cartItems.length > 0 && (
          <Button
            className={`${styles.btn__modal} ${styles.btn__modal_order}`}
            onClick={orderHandler}
          >
            Order
          </Button>
        )}
      </div>
    </List>
  );
}
export default MyCart;
