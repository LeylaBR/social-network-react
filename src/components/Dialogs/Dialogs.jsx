import React from "react";
import styles from "./Dialogs.module.css";
import DialogsList from "./DialogsList/DialogList";
import Message from "./Message/Message";
import { Form, Field } from "react-final-form";
import { Input } from "../FormControls/FormControls";
import { required, composeValidators } from "../validators/validators";
import { Button } from "../common/button/Button";

const MessageForm = ({ getMessages, authUserId }) => {
  const onSubmit = (value, api) => {
    getMessages(authUserId, value.message);
    api.reset();
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Field
            name="message"
            component={Input}
            placeholder="Enter your message"
            type="text"
            validate={composeValidators(required)}
            className={styles.formInput}
          />
          <div className={styles.buttonDialog}>
            <Button type="submit" text="Send" />
          </div>
        </form>
      )}
    />
  );
};

const Dialogs = ({ dialogData, messagesList, getMessages, authUserId }) => {
  const messagesListElements = messagesList.map((message) => (
    <Message key={message.id} messageUser={message} />
  ));

  return (
    <section className={styles.dialogs}>
      <div className={styles.info}>
        <div className={styles.list}>
          <DialogsList dialogData={dialogData} />
        </div>
        <div className={styles.messages}>
          {messagesListElements}
          <MessageForm getMessages={getMessages} authUserId={authUserId} />
        </div>
      </div>
    </section>
  );
};

export default Dialogs;
