import React from "react";
import Modal from "../Modal/Modal";

const Envelope = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div class="wrapper">
        <div class="lid one"></div>
        <div class="lid two"></div>
        <div class="envelope"></div>
        <div class="letter">
          {props.desc === "" ? (
            <p>No special message yet</p>
          ) : (
            <p>{props.desc}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Envelope;
