import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../components/utils/helpers";

const FOLLOW = "user/FOLLOW";
const UNFOLLOW = "user/UNFOLLOW";
const SET_USERS = "user/SET-USERS";
const SET_TOTAL_COUNT = "user/SET-TOTAL-COUNT";
const SET_CURRENT_PAGE = "user/SET-CURRENT-PAGE";
const TOGGLE_IS_FETCHING = "user/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING = "user/TOGGLE_IS_FOLLOWING";

const initialState = {
  usersList: [],
  totalCount: 0,
  pageSize: 5,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersList: updateObjectInArray(state.usersList, action.userId, "id", {
          followed: true,
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        usersList: updateObjectInArray(state.usersList, action.userId, "id", {
          followed: false,
        }),
      };

    case SET_USERS:
      return {
        ...state,
        usersList: action.users,
      };

    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.number,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.number,
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case TOGGLE_IS_FOLLOWING:
      return {
        ...state,
        followingInProgress: action.isFollowing
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });

export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });

export const setUsers = (users) => ({ type: SET_USERS, users });

export const setTotalCount = (number) => ({ type: SET_TOTAL_COUNT, number });

export const setCurrentPage = (number) => ({ type: SET_CURRENT_PAGE, number });

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const toggleIsFollowing = (isFollowing, userId) => ({
  type: TOGGLE_IS_FOLLOWING,
  isFollowing,
  userId,
});

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
  dispatch(setCurrentPage(currentPage));
  dispatch(toggleIsFetching(true));
  const response = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(response.items));
  dispatch(setTotalCount(response.totalCount));
};

const followUnfollow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleIsFollowing(true, userId));
  const response = await apiMethod(userId);
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowing(false, userId));
};

export const setFollow = (userId) => async (dispatch) => {
  followUnfollow(dispatch, userId, usersAPI.followedUser, followSuccess);
};

export const setUnfollow = (userId) => async (dispatch) => {
  followUnfollow(dispatch, userId, usersAPI.unfollowedUser, unfollowSuccess);
};
