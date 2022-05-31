import { usersAPI } from "../api/api";

const ADD_MESSAGE = "message/ADD-MESSAGE";
const SET_USER_PROFILE = "message/SET-USER-PROFILE";

const initialState = {
  dialogData: [],
  messagesList: [],
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const newMessage = {
        id: state.messagesList.length + 1,
        message: action.messageInputValue,
        fullName: "Me",
        avatar: action.user.photos.small,
      };
      return {
        ...state,
        messagesList: [...state.messagesList, newMessage],
      };

    case SET_USER_PROFILE:
      const setMessage = {
        id: 1,
        message: "Hello, my friend",
        fullName: action.user.fullName,
        avatar: action.user.photos.small,
      };
      return {
        ...state,
        dialogData: action.user,
        messagesList: [setMessage],
      };

    default:
      return state;
  }
};

export const addMessage = (messageInputValue, user) => ({
  type: ADD_MESSAGE,
  messageInputValue,
  user,
});

export const setUserProfile = (user) => ({
  type: SET_USER_PROFILE,
  user,
});

export const getDataUser = (id) => async (dispatch) => {
  const response = await usersAPI.userProfile(id);
  dispatch(setUserProfile(response));
};

export const getMessages = (id, value) => async (dispatch) => {
  const response = await usersAPI.userProfile(id);
  dispatch(addMessage(value, response));
};
