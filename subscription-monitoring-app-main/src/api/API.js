import axios from "axios";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  saveValueToLocalStorage,
} from "../utils";
import UserService from "../services/UserService";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let subscribers = [];

const refreshUser = async () => {
  try {
    const u = getItemFromLocalStorage("user");
    console.log({
      email: u.userName,
      refreshToken: u.refreshToken,
    });

    const response = await UserService.refresh({
      email: u.userName,
      refreshToken: u.refreshToken,
    });

    const refreshedUser = response.data;
    saveValueToLocalStorage(refreshedUser);
    return refreshedUser;
  } catch (error) {
    console.log("Error refreshing user: ", error);
    return null;
  }
};

API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(getItemFromLocalStorage("user"));

    if (user && user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;

    if (response && response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        const user = await refreshUser();

        if (user) {
          const { token } = user;
          config.headers.Authorization = `Bearer ${token}`;

          subscribers.forEach((callback) => callback(token));
          subscribers = [];
          return API.request(config);
        } else {
          // Remove user in localstorage manually
          removeItemFromLocalStorage("user");
          // Redirect to login page
          window.location.href = "/login";
        }
      }

      const retryOriginalRequest = new Promise((resolve) => {
        subscribers.push((token) => {
          config.headers.Authorization = `Bearer ${token}`;
          resolve(API.request(config));
        });
      });

      return retryOriginalRequest;
    }

    // Add condition for status code 403
    if (response && response.status === 403) {
      // Redirect to previous page
      window.history.back();
    }

    return Promise.reject(error);
  }
);

export default API;
