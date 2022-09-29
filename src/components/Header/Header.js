import { useContext, useEffect, useState } from "react";
import Context from "../../store/context";
import styles from "./Header.module.css";
import Button from "../UI/Button";

function Header(props) {
  const context = useContext(Context);
  const [isCartBtnPopUp, setIsCartBtnPopUp] = useState(false);

  // Control cart button pop up animation
  useEffect(() => {
    //Only pop up when amount of cart items greater than 0;
    if (!context.orderAmount) {
      return;
    } else {
      setIsCartBtnPopUp(true);
      // Remove class of animation
      const popTimer = setTimeout(() => {
        setIsCartBtnPopUp(false);
      }, 200);
      return () => {
        clearTimeout(popTimer);
      };
    }
  }, [context.orderAmount]);

  return (
    <header className={styles.header}>
      <a href="#body" className={styles.header__title}>
        ReactMeals
      </a>
      <Button
        className={`${styles.btn__cart} ${isCartBtnPopUp && styles.animate}`}
        onClick={props.onModalOpenControl}
      >
        <ion-icon
          className={styles["header__cart-icon"]}
          name="cart"
        ></ion-icon>
        <span>Your Cart</span>
        <span className={styles["header__cart-item-amount"]}>
          {context.orderAmount}
        </span>
      </Button>
    </header>
  );
}

export default Header;
