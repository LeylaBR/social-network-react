import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  profileUser,
  userStatus,
  updateStatus,
  savePhoto,
} from "../../redux/profileReducer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import { Loader } from "../common/loader/Loader";

const ProfileContainer = (props) => {
  const {
    authUserId,
    profileUser,
    userStatus,
    userProfile,
    status,
    updateStatus,
    savePhoto,
  } = props;

  let { id = authUserId } = useParams();

  useEffect(() => {
    profileUser(id);
    userStatus(id);
  }, []);

  return (
    <>
      {!userProfile ? (
        <Loader />
      ) : (
        <Profile
          {...props}
          userProfile={userProfile}
          status={status}
          updateStatus={updateStatus}
          id={id}
          authUserId={authUserId}
          savePhoto={savePhoto}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  userProfile: state.profilePage.userProfile,
  status: state.profilePage.status,
  authUserId: state.auth.userId,
  isFetching: state.profilePage.isFetching,
});

export default compose(
  connect(mapStateToProps, {
    profileUser,
    userStatus,
    updateStatus,
    savePhoto,
  }),
  withAuthRedirect
)(ProfileContainer);
