import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/img/user.png";
import { NavLink } from "react-router-dom";
import { Button } from "../common/button/Button";

const User = ({ user, followingInProgress, setFollow, setUnfollow }) => (
  <div className={styles.item}>
    <div className={styles.avatar}>
      <NavLink to={`/profile/${user.id}`}>
        <img
          alt="avatar"
          src={user.photos.small !== null ? user.photos.small : userPhoto}
        />
      </NavLink>
      <NavLink to={`/dialogs/${user.id}`}>
        <Button className={styles.messageButton} text="message" />
      </NavLink>
    </div>
    <div className={styles.info}>
      <div className={styles.desc}>
        <div>{user.name}</div>
        <p>{user.status}</p>
      </div>
    </div>
    <div>
      <Button
        className={user.followed ? styles.unfollowed : styles.followed}
        onClick={
          user.followed
            ? () => {
                setUnfollow(user.id);
              }
            : () => {
                setFollow(user.id);
              }
        }
        text={user.followed ? "UNFOLLOW" : "FOLLOW"}
        disabled={followingInProgress.some((id) => id === user.id)}
      />
    </div>
  </div>
);

export default User;
