import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const setActive = ({ isActive }) => (isActive ? styles.active : "");

const Navbar = () => (
  <nav className={styles.nav}>
    <NavLink to={"/profile"} className={setActive}>
      Profile
    </NavLink>
    <NavLink to={"/dialogs"} className={setActive}>
      Messages
    </NavLink>
    {/* <NavLink to={"/news"} className={setActive}>
        News
      </NavLink>
      <NavLink to={"/music"} className={setActive}>
        Music
      </NavLink> */}
    <NavLink to={"/users"} className={setActive}>
      Users
    </NavLink>
    <NavLink to={"/friends"} className={setActive}>
      Friends
    </NavLink>
    {/* <NavLink to={"/settings"} className={setActive}>
        Settings
      </NavLink> */}
  </nav>
);

export default Navbar;
