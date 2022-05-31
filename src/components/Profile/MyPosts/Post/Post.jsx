import React from "react";
import styles from "./Post.module.css";
import likeImag from "../../../../assets/img/like.png";
import deleteCross from "../../../../assets/img/iconsCross.svg";
import postAvatar from "../../../../assets/img/user.png";

const Post = ({ post, likePost, deletePost }) => (
  <div className={styles.list}>
    <div className={styles.block}>
      <img alt="avatar" className={styles.avatar} src={postAvatar} />
      <div className={styles.text}>{post.message}</div>
    </div>
    <div className={styles.likeBlock} onClick={() => likePost(post.id)}>
      <img alt="likeImg" className={styles.likeImg} src={likeImag} />
      <div className={styles.likeCount}>{post.likesCount}</div>
    </div>
    <div className={styles.delete} onClick={() => deletePost(post.id)}>
      <img alt="deleteImg" src={deleteCross} />
    </div>
  </div>
);

export default Post;
