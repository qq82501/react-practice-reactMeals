import React from "react";
import styles from "./Input.module.css";

function Input(props) {
  return (
    <React.Fragment>
      <label className={styles.label} htmlFor={props.input.id}>
        {props.labelName}
      </label>
      <input className={styles.input} {...props.input} />
    </React.Fragment>
  );
}

export default Input;
