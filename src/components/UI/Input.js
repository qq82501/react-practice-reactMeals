import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <React.Fragment>
      <label
        className={`${styles.label} ${props.labelClass}`}
        htmlFor={props.input.id}
      >
        {props.labelName}{" "}
        {props.hasError && (
          <span className={styles["error-message"]}>{props.errMessage}</span>
        )}
      </label>
      <input
        className={`${styles.input} ${props.inputClass}`}
        {...props.input}
        ref={ref}
      />
    </React.Fragment>
  );
});

export default Input;
