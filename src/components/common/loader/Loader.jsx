import React from "react";
import styles from "./Loader.module.css";

export const Loader = ({ mini }) => (
  <div
    className={
      mini
        ? `${styles.loaderContainer} ${styles.loaderContainerMini}`
        : styles.loaderContainer
    }
  >
    <div
      className={mini ? `${styles.loader} ${styles.loaderMini}` : styles.loader}
    ></div>
  </div>
);
