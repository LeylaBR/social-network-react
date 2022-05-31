import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import logoImage from "../../assets/img/logo.svg";
import { Button } from "../common/button/Button";

const Header = ({ isAuth, login, logout }) => (
  <header className={styles.header}>
    <img alt="logo" src={logoImage} />
    <div className={styles.login}>
      {isAuth ? (
        <div className={styles.loginBlock}>
          <span>{login}</span>
          <Button onClick={logout} text="Log Out" />
        </div>
      ) : (
        <NavLink to={"/login"}>
          <Button text="Log In" />
        </NavLink>
      )}
    </div>
  </header>
);

export default Header;
