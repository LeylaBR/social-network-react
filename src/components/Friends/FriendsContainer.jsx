import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Friends from "./Friends";
import { Loader } from "../common/loader/Loader";
import { useEffect } from "react";
import {
  setFollow,
  setUnfollow,
  getFriendUsers,
  setCurrentPage,
} from "../../redux/friendsReducer";
import { withAuthRedirect } from "../hoc/withAuthRedirect";

const FriendsContainer = ({
  currentPage,
  pageSize,
  getFriendUsers,
  isFetching,
  ...props
}) => {
  useEffect(() => {
    getFriendUsers(currentPage, pageSize, true);
  }, []);

  const onPageChanged = (p) => {
    getFriendUsers(p, pageSize, true);
  };

  return (
    <>
      {isFetching ? <Loader /> : null}
      <Friends
        {...props}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        isFetching={isFetching}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  friendList: state.friendsPage.friendList,
  pageSize: state.friendsPage.pageSize,
  currentPage: state.friendsPage.currentPage,
  isFetching: state.friendsPage.isFetching,
  followingInProgress: state.friendsPage.followingInProgress,
  totalCount: state.friendsPage.totalCount,
});

export default compose(
  connect(mapStateToProps, {
    getFriendUsers,
    setFollow,
    setUnfollow,
    setCurrentPage,
  }),
  withAuthRedirect
)(FriendsContainer);
