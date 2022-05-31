import React from "react";
import styles from "./Login.module.css";
import { Form, Field } from "react-final-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { authLogin } from "../../redux/authReducer";
import { Input } from "../FormControls/FormControls";
import { required } from "../validators/validators";
import { Navigate } from "react-router-dom";
import { Button } from "../common/button/Button";

const LoginForm = ({ authLogin, messagesError }) => {
  const onSubmit = (e) => {
    authLogin(e.login, e.password, e.remember_me);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.inputBlock}>
            <Field
              name="login"
              component={Input}
              placeholder={"Login"}
              validate={required}
            />
          </div>
          <div className={styles.inputBlock}>
            <Field
              name="password"
              component={Input}
              placeholder={"Password"}
              validate={required}
              type="password"
            />
          </div>
          {messagesError !== "" ? (
            <div className={styles.messagesError}>{messagesError}</div>
          ) : null}
          <div className={styles.check}>
            <Field name="remember_me" component={Input} type="checkbox" />
            remember me
          </div>
          <div>
            <Button type="submit" text="Log In" />
          </div>
        </form>
      )}
    />
  );
};

const Login = ({ isAuth, authLogin, messagesError }) => {
  return (
    <div>
      {isAuth ? (
        <Navigate to={"/profile"} />
      ) : (
        <div className={styles.login}>
          <h1>LOGIN</h1>
          <LoginForm authLogin={authLogin} messagesError={messagesError} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  messagesError: state.auth.messages,
});

export default compose(connect(mapStateToProps, { authLogin }))(Login);
