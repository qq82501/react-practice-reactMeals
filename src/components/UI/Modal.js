import ReactDOM from "react-dom";
import React from "react";
import "./Modal.module.css";

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
  return <div className={`modal`} onClick={props.onModalClose}></div>;
}

function Overlap(props) {
  return <div>{props.children}</div>;
}

export default Modal;
