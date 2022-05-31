import React from "react";
import styles from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({
  userProfile,
  status,
  updateStatus,
  id,
  authUserId,
  savePhoto,
  ...props
}) => (
  <section className={styles.content}>
    <ProfileInfo
      userProfile={userProfile}
      status={status}
      updateStatus={updateStatus}
      id={id}
      authUserId={authUserId}
      savePhoto={savePhoto}
      {...props}
    />
    {authUserId === +id ? <MyPostsContainer /> : null}
  </section>
);

export default Profile;
