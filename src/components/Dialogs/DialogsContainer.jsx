import React, { useEffect } from "react";
import { getMessages, getDataUser } from "../../redux/messageReducer";
import { connect } from "react-redux";
import Dialogs from "./Dialogs";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import { Loader } from "../common/loader/Loader";
import { useParams } from "react-router-dom";

const DialogsContainer = ({ getDataUser, dialogData, ...props }) => {
  let { id = 23842 } = useParams();

  useEffect(() => {
    getDataUser(id);
  }, []);

  return (
    <>
      {dialogData.length !== 0 ? (
        <Dialogs dialogData={dialogData} {...props} />
      ) : (
        <Loader />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  dialogData: state.messagesPage.dialogData,
  messagesList: state.messagesPage.messagesList,
  authUserId: state.auth.userId,
});

export default compose(
  connect(mapStateToProps, {
    getMessages,
    getDataUser,
  }),
  withAuthRedirect
)(DialogsContainer);
