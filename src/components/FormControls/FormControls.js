import React from "react";
import styles from "./FormControls.module.css";

export const Input = ({ input, meta, ...props }) => {
  return (
    <div className={styles.postNew}>
      <input
        {...input}
        {...props}
        className={`${meta.error && meta.touched ? styles.inputError : ""} ${
          props.className
        }`}
      />
      {meta.error && meta.touched && (
        <span className={styles.error}>{meta.error}</span>
      )}
    </div>
  );
};
