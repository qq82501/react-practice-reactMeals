import { useContext, useRef, useState } from "react";
import Context from "../../store/context";
import styles from "./MenuItem.module.css";
import Button from "../UI/Button";

function MenuItem(props) {
  const context = useContext(Context);
  const refInput = useRef();
  const [inputAmount, setInputAmount] = useState("");
  const addHandler = function () {
    if (inputAmount < 1) return setInputAmount("");
    const addedItem = {
      amount: inputAmount,
      name: props.name,
      price: props.price,
      itemNo: Math.random(),
    };
    context.onAdd(addedItem);
    const myAmout = context.orderAmount + addedItem.amount;
    const myItems = [...context.cartItems, addedItem];

    localStorage.setItem("storageAmount", myAmout);
    localStorage.setItem("storageCartItems", JSON.stringify(myItems));
    setInputAmount("");
  };
  const changeHandler = function (e) {
    //rule: everything except 0-9 character
    const regex = /[^1-9]/g;
    // according to regex, value can only show 0-9 characters.
    const value = +e.target.value.replace(regex, "");
    setInputAmount(value);
  };
  return (
    <li className={styles.meal}>
      <div className={styles.meal__info}>
        <p className={styles.meal__name}>{props.name}</p>
        <p className={styles.meal__description}>{props.description}</p>
        <p className={styles.meal__price}>{`$${props.price.toFixed(2)}`}</p>
      </div>
      <div className={styles.meal__order}>
        <label>Amount</label>
        <input
          type="text"
          value={inputAmount}
          ref={refInput}
          onChange={changeHandler}
        />
        <Button className={styles.btn__add} onClick={addHandler}>
          + Add
        </Button>
      </div>
    </li>
  );
}

export default MenuItem;
