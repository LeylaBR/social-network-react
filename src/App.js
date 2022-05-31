import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import FriendsContainer from "./components/Friends/FriendsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { initializedApp } from "./redux/appReducer";
import { Loader } from "./components/common/loader/Loader";

const App = ({ initializedApp, initialized }) => {
  useEffect(() => {
    initializedApp();
  }, []);

  return (
    <>
      {initialized ? (
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className="app-content">
            <Routes>
              <Route path="profile" element={<ProfileContainer />} />
              <Route path="profile/:id" element={<ProfileContainer />} />
              <Route path="dialogs" element={<DialogsContainer />} />
              <Route path="dialogs/:id" element={<DialogsContainer />} />
              <Route path="news" element={<News />} />
              <Route path="music" element={<Music />} />
              <Route path="settings" element={<Settings />} />
              <Route path="friends" element={<FriendsContainer />} />
              <Route path="users" element={<UsersContainer />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({ initialized: state.app.initialized });

export default connect(mapStateToProps, { initializedApp })(App);
