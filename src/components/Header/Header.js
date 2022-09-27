import { useContext } from "react";
import Context from "../../store/context";
import styles from "./Header.module.css";
import Button from "../UI/Button";

function Header(props) {
  const context = useContext(Context);

  return (
    <div className={styles.header}>
      <a href="#body" className={styles.header__title}>
        ReactMeals
      </a>
      <Button className={styles.btn__cart} onClick={props.onModalOpenControl}>
        <ion-icon
          className={styles["header__cart-icon"]}
          name="cart"
        ></ion-icon>
        <span>Your Cart</span>
        <span className={styles["header__cart-item-amount"]}>
          {context.orderAmount}
        </span>
      </Button>
    </div>
  );
}

export default Header;
