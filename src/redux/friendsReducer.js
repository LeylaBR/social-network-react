import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../components/utils/helpers";

const FOLLOW = "friends/FOLLOW";
const UNFOLLOW = "friends/UNFOLLOW";
const SET_FRIENDS = "friends/SET_FRIENDS";
const SET_TOTAL_COUNT = "friends/SET-TOTAL-COUNT";
const SET_CURRENT_PAGE = "friends/SET-CURRENT-PAGE";
const TOGGLE_IS_FETCHING = "friends/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING = "friends/TOGGLE_IS_FOLLOWING";

const initialState = {
  friendList: [],
  totalCount: 0,
  pageSize: 5,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const createFollowState = (state, action, followed) => ({
  ...state,
  friendList: updateObjectInArray(state.friendList, action.userId, "id", {
    followed,
  }),
});

export const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return createFollowState(state, action, true);

    case UNFOLLOW:
      return createFollowState(state, action, false);

    case SET_FRIENDS:
      return {
        ...state,
        friendList: action.users,
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

export const setFriends = (users) => ({ type: SET_FRIENDS, users });

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

export const getFriendUsers = (currentPage, pageSize) => async (dispatch) => {
  dispatch(setCurrentPage(currentPage));
  dispatch(toggleIsFetching(true));
  const response = await usersAPI.getFriendUsers(currentPage, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setFriends(response.items));
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
