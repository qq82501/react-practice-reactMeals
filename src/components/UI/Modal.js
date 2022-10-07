import ReactDOM from "react-dom";
import React, { useContext } from "react";
import Context from "../../store/context";
import styles from "./Modal.module.css";

function Modal(props) {
  const portalTo = document.querySelector("#modal");
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onModalClose={props.onModalClose} />,
        portalTo
      )}
      {/* {ReactDOM.createPortal(
        <Overlap onModalClose={props.onModalClose} />,
        portalTo
      )} */}
      {ReactDOM.createPortal(<Overlap>{props.overlap}</Overlap>, portalTo)}
    </React.Fragment>
  );
}

function Backdrop(props) {
  const context = useContext(Context);
  return <div className={`modal`} onClick={context.onModalClose}></div>;
}

function Overlap(props) {
  return <div className={styles.overlap}>{props.children}</div>;
}

export default Modal;
