import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setFollow,
  setUnfollow,
  setCurrentPage,
  getUsers,
} from "../../redux/usersReducer";
import Users from "./Users";
import { Loader } from "../common/loader/Loader";
import { compose } from "redux";
import {
  usersList,
  totalCount,
  pageSize,
  currentPage,
  isFetching,
  followingInProgress,
} from "../../redux/usersSelects";

const UsersContainer = ({
  currentPage,
  pageSize,
  getUsers,
  isFetching,
  ...props
}) => {
  useEffect(() => {
    getUsers(currentPage, pageSize);
  }, []);

  const onPageChanged = (p) => {
    getUsers(p, pageSize);
  };

  return (
    <>
      {isFetching ? <Loader /> : null}
      <Users
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
  usersList: usersList(state),
  totalCount: totalCount(state),
  pageSize: pageSize(state),
  currentPage: currentPage(state),
  isFetching: isFetching(state),
  followingInProgress: followingInProgress(state),
});

export default compose(
  connect(mapStateToProps, {
    setFollow,
    setUnfollow,
    setCurrentPage,
    getUsers,
  })
)(UsersContainer);
