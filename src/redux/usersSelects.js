import { createSelector } from "reselect";

const getUsersSelector = (state) => state.usersPage.usersList;

export const usersList = createSelector(getUsersSelector, (usersList) =>
  usersList.filter((u) => true)
);

export const totalCount = (state) => state.usersPage.totalCount;

export const pageSize = (state) => state.usersPage.pageSize;

export const currentPage = (state) => state.usersPage.currentPage;

export const isFetching = (state) => state.usersPage.isFetching;

export const followingInProgress = (state) =>
  state.usersPage.followingInProgress;
