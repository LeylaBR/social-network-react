import React from "react";
import styles from "./ProfileInfo.module.css";
import userPhoto from "../../../assets/img/user.png";
import { Loader } from "../../common/loader/Loader";
import ProfileStatus from "./ProfileStatus";
import { contactDesc } from "../../utils/helpers";
import iconUpload from "../../../assets/img/iconUpload.png";
import headerImage from "../../../assets/img/profileHeader.png";

const ProfileInfo = (props) => {
  const {
    userProfile,
    status,
    updateStatus,
    authUserId,
    id,
    savePhoto,
    isFetching,
  } = props;

  const onMainPhotoSelects = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <img alt="headerImg" src={headerImage}></img>
      </div>
      <div className={styles.info}>
        <div className={styles.avatar}>
          {isFetching ? (
            <Loader mini={true} />
          ) : (
            <img
              src={userProfile.photos.large ?? userPhoto}
              alt="avatar"
              className={styles.avatarImg}
            />
          )}

          {authUserId === +id && !isFetching && (
            <div className={styles.updatePhoto}>
              <label className={styles.upload}>
                <img
                  alt="iconUpload"
                  src={iconUpload}
                  className={styles.uploadIcon}
                />
                <span>Update photo</span>
                <input
                  type="file"
                  className={styles.newAvatar}
                  onChange={onMainPhotoSelects}
                />
              </label>
            </div>
          )}
        </div>
        <div className={styles.desc}>
          <h3 className={styles.userName}>{userProfile.fullName}</h3>
          <div className={styles.contacts}>
            Contacts: {contactDesc(userProfile.contacts)}
          </div>
          <ProfileStatus
            profileStatus={status}
            updateStatus={updateStatus}
            authUserId={authUserId}
            id={id}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
