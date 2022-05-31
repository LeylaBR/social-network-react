import React from "react";
import Paginator from "../Paginator/Paginator";
import User from "../Users/User";
import styles from "../Users/Users.module.css";

const Friends = ({ friendList, isFetching, ...props }) => (
  <section className={isFetching ? styles.list : null}>
    <Paginator {...props} />
    {friendList.map((user) => (
      <User user={user} {...props} key={user.id} />
    ))}
  </section>
);

export default Friends;
