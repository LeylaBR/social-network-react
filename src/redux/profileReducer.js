import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = "profile/ADD-POST";
const DELETE_POST = "profile/DELETE_POST";
const SET_USER_PROFILE = "profile/SET-USER-PROFILE";
const SET_USER_STATUS = "profile/SET_USER_STATUS";
const LIKE_POST = "profile/LIKE_POST";
const SET_USER_AVATAR = "profile/SET_USER_AVATAR";
const TOGGLE_IS_FETCHING = "profile/TOGGLE_IS_FETCHING";

const initialState = {
  postData: [
    { id: 1, message: "Hi, how are you?", likesCount: 10 },
    { id: 2, message: "It's my first post", likesCount: 5 },
    { id: 3, message: "I'm at an exhibition in Italy", likesCount: 50 },
  ],
  userProfile: null,
  status: "",
  isFetching: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.postData.length + 1,
        message: action.postInputValue,
        likesCount: 0,
      };
      return {
        ...state,
        postData: [newPost, ...state.postData],
      };
    case DELETE_POST:
      return {
        ...state,
        postData: state.postData.filter((it) => it.id !== action.id),
      };
    case LIKE_POST:
      return {
        ...state,
        postData: state.postData.map((it) => {
          if (it.id === action.postId) {
            return {
              ...it,
              likesCount: ++it.likesCount,
            };
          }
          return it;
        }),
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.user,
      };
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SET_USER_AVATAR:
      return {
        ...state,
        userProfile: { ...state.userProfile, photos: action.file },
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

export const setUserProfile = (user) => ({
  type: SET_USER_PROFILE,
  user,
});

export const addPost = (postInputValue) => ({
  type: ADD_POST,
  postInputValue,
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  id,
});

export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});

export const likePost = (postId) => ({
  type: LIKE_POST,
  postId,
});

export const setUserAvatar = (file) => ({
  type: SET_USER_AVATAR,
  file,
});

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

const getUserData = async (dispatch, apiMethod, id, actionCreator) => {
  const response = await apiMethod(id);
  dispatch(actionCreator(response));
};

export const profileUser = (id) => async (dispatch) => {
  getUserData(dispatch, usersAPI.userProfile, id, setUserProfile);
};

export const userStatus = (userId) => async (dispatch) => {
  getUserData(dispatch, profileAPI.getStatus, userId, setUserStatus);
};

export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setUserStatus(response.data));
  }
};

export const savePhoto = (file) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  const response = await profileAPI.updateAvatar(file);
  if (response.resultCode === 0) {
    dispatch(setUserAvatar(response.data.photos));
  }
  dispatch(toggleIsFetching(false));
};
