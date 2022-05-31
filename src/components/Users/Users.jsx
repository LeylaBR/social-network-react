import React from "react";
import styles from "./Users.module.css";
import Paginator from "../Paginator/Paginator";
import User from "./User";

const Users = ({ usersList, isFetching, ...props }) => (
  <section className={isFetching ? styles.list : null}>
    <Paginator {...props} />
    {usersList.map((user) => (
      <User user={user} {...props} key={user.id} />
    ))}
  </section>
);

export default Users;
