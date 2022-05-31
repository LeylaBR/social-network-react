import { authAPI } from "../api/api";

const SET_AUTH_USER_DATA = "auth/SET-AUTH-USER-DATA";
const SET_AUTH_ERROR_MESSAGE = "auth/SET_AUTH_ERROR_MESSAGE";

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  messages: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.data,
      };
    case SET_AUTH_ERROR_MESSAGE:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_AUTH_USER_DATA,
  data: { userId, email, login, isAuth },
});

export const setAuthErrorMessage = (messages) => ({
  type: SET_AUTH_ERROR_MESSAGE,
  messages,
});

export const authorization = () => async (dispatch) => {
  const response = await authAPI.me();
  if (response.resultCode === 0) {
    let { id, email, login } = response.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const authLogin = (email, password, rememberMe) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe);
  if (response.resultCode === 0) {
    return dispatch(authorization());
  }
  let messages = response.messages.length ? response.messages[0] : "Some Error";
  dispatch(setAuthErrorMessage(messages));
};

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
