import MyPosts from "./MyPosts";
import { addPost, likePost, deletePost } from "../../../redux/profileReducer";
import { connect } from "react-redux";

const MyPostsContainer = (props) => (
  <>
    <MyPosts {...props} />
  </>
);

const mapStateToProps = (state) => ({
  postData: state.profilePage.postData,
});

export default connect(mapStateToProps, {
  addPost,
  likePost,
  deletePost,
})(MyPostsContainer);
