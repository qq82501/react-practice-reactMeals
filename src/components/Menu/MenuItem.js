import { useContext, useState } from "react";
import Context from "../../store/context";
import styles from "./MenuItem.module.css";
import Button from "../UI/Button";
import Input from "../UI/Input";

function MenuItem(props) {
  const context = useContext(Context);
  const [inputAmount, setInputAmount] = useState(1);

  const addHandler = function (e) {
    e.preventDefault();
    if (inputAmount < 1) return setInputAmount("");
    const addedItem = {
      amount: inputAmount,
      name: props.name,
      price: props.price,
      itemNo: props.id,
    };
    context.onAdd(addedItem);
    setInputAmount(1);
  };

  const changeHandler = function (e) {
    //rule: everything except 0-9 character
    const regex = /[^0-9]/g;
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
      <form className={styles.meal__order} onSubmit={addHandler}>
        <Input
          labelName="Amount"
          input={{
            type: "number",
            id: `amount__${props.id}`,
            min: 1,
            max: 20,
            step: 1,
            value: inputAmount,
            onChange: changeHandler,
          }}
        />
        <Button className={styles.btn__add} type="submit">
          + Add
        </Button>
      </form>
    </li>
  );
}

export default MenuItem;
