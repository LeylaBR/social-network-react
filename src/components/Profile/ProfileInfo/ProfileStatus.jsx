import React, { useEffect, useState } from "react";
import styles from "./ProfileStatus.module.css";

const ProfileStatus = ({ profileStatus, updateStatus, authUserId, id }) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(profileStatus);

  const activateEditMode = () => setEditMode(true);

  const deactivateEditMode = () => {
    setEditMode(false);
    updateStatus(status);
  };

  const onStatusChange = (e) => setStatus(e.currentTarget.value);

  const onSubmitClickChange = (e) => {
    if (e.code === "Enter") {
      deactivateEditMode();
    }
  };

  useEffect(() => {
    setStatus(profileStatus);
  }, [profileStatus]);

  return (
    <div className={styles.status}>
      <div className={styles.about}>About me:</div>
      {authUserId === +id ? (
        editMode ? (
          <div className={styles.statusInput}>
            <input
              placeholder="Set status"
              autoFocus={true}
              value={status}
              onChange={onStatusChange}
              onBlur={deactivateEditMode}
              onKeyDown={onSubmitClickChange}
            />
          </div>
        ) : (
          <div className={styles.statusText} onDoubleClick={activateEditMode}>
            {status || <span className={styles.setStatus}>Set status</span>}
          </div>
        )
      ) : (
        <div className={styles.statusUser}>
          {status || <span>No Status</span>}
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
