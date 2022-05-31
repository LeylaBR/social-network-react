import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./DialogList.module.css";
import userPhoto from "../../../assets/img/user.png";

const setActive = ({ isActive }) => (isActive ? styles.active : "");

const DialogsList = (props) => {
  const { fullName, photos, userId } = props.dialogData;

  return (
    <div className={styles.item}>
      <div className={styles.avatar}>
        <img alt="avatar" src={!photos.small ? userPhoto : photos.small} />
      </div>
      <NavLink to={`/dialogs/${userId}`} className={setActive}>
        {fullName}
      </NavLink>
    </div>
  );
};

export default DialogsList;
