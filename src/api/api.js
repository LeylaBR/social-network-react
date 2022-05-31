import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0",
  withCredentials: true,
  headers: {
    "API-KEY": "0bf7baf7-6294-46d8-a84f-29efbc2a1d32",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  getFriendUsers(currentPage = 1, pageSize = 10, friend = true) {
    if (friend !== undefined) {
      return instance
        .get(`users?page=${currentPage}&count=${pageSize}&friend=${friend}`)
        .then((response) => response.data);
    }
  },
  unfollowedUser(userId) {
    return instance
      .delete(`follow/${userId}`)
      .then((response) => response.data);
  },
  followedUser(userId) {
    return instance.post(`follow/${userId}`).then((response) => response.data);
  },
  userProfile(id) {
    return instance.get(`profile/${id}`).then((response) => response.data);
  },
};

export const profileAPI = {
  getStatus(userId) {
    return instance
      .get(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateStatus(newStatus) {
    return instance
      .put(`profile/status`, { status: newStatus })
      .then((response) => response.data);
  },
  updateAvatar(newPhoto) {
    const formData = new FormData();
    formData.append("image", newPhoto);
    return instance
      .put(`/profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`).then((response) => response.data);
  },
  login(email, password, rememberMe = false) {
    return instance
      .post(`auth/login`, {
        email,
        password,
        rememberMe,
      })
      .then((response) => response.data);
  },
  logout() {
    return instance.delete(`auth/login`).then((response) => response.data);
  },
};
