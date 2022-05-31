import { applyMiddleware, combineReducers, createStore } from "redux";
import { profileReducer } from "./profileReducer";
import { messageReducer } from "./messageReducer";
import { usersReducer } from "./usersReducer";
import { authReducer } from "./authReducer";
import { appReducer } from "./appReducer";
import { friendsReducer } from "./friendsReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messageReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  friendsPage: friendsReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));

window.store = store;
