import React from "react";
import styles from "./Message.module.css";
import userPhoto from "../../../assets/img/user.png";

const Message = ({ messageUser }) => {
  const { avatar, fullName, message } = messageUser;

  return (
    <div
      className={
        fullName === "Me" ? `${styles.item} ${styles.right}` : styles.item
      }
    >
      <div className={styles.avatar}>
        <img alt="avatar" src={!avatar ? userPhoto : avatar} />
        <div>{fullName}</div>
      </div>
      <div>{message}</div>
    </div>
  );
};

export default Message;
