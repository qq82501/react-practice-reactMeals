import { useContext } from "react";
import Context from "../../store/context";
import Button from "../UI/Button";
import styles from "./CartItem.module.css";

function CartItem(props) {
  const context = useContext(Context);

  const decreaseHandler = function () {
    const item = {
      itemNo: props.itemNo,
      updatedAmount: props.amount - 1,
      action: "minus",
    };
    context.onUpdateItem(item);
  };
  const increaseHandler = function () {
    const item = {
      itemNo: props.itemNo,
      updatedAmount: props.amount + 1,
      action: "plus",
    };
    context.onUpdateItem(item);
  };

  return (
    <li className={styles.cart_item}>
      <div className={styles.cart_item__info}>
        <p className={styles.cart_item__name}>{props.name}</p>
        <p className={styles.cart_item__price}>{`$${props.price}`}</p>
        <p className={styles.cart_item__amount}>{`x ${props.amount}`}</p>
      </div>
      <div className={styles.cart_item__btn_box}>
        <Button className={styles.cart_item__btn} onClick={decreaseHandler}>
          –
        </Button>
        <Button className={styles.cart_item__btn} onClick={increaseHandler}>
          +
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
