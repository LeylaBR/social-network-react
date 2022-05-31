import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Form, Field } from "react-final-form";
import { required } from "../../validators/validators";
import { Input } from "../../FormControls/FormControls";
import { useState } from "react";
import { Button } from "../../common/button/Button";

const MyPostsForm = ({ addPost }) => {
  const [touched, setTouched] = useState(false);

  const activateTouched = (e) => {
    setTouched(true);
  };

  const onSubmit = (value, api) => {
    addPost(value.post);
    api.reset();
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className={styles.form}
          onFocus={activateTouched}
        >
          <div className={styles.postInput}>
            <Field
              name="post"
              component={Input}
              placeholder="Enter your post"
              validate={required}
              className={styles.inputForPost}
            />
            {touched && <Button type="submit" text="Publish" />}
          </div>
        </form>
      )}
    />
  );
};

const MyPosts = React.memo(({ postData, addPost, likePost, deletePost }) => {
  return (
    <div className={styles.post}>
      <h3>My post</h3>
      <div className={styles.newPost}>
        <MyPostsForm addPost={addPost} />
        {postData.map((post) => (
          <Post
            post={post}
            likePost={likePost}
            deletePost={deletePost}
            key={post.id}
          />
        ))}
      </div>
    </div>
  );
});

export default MyPosts;
