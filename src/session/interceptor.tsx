import axios, { AxiosInstance } from "axios";
import {
  URL_BACKEND_CONTESTS,
  URL_BACKEND_PROBLEMS,
  URL_BACKEND_STATS,
  URL_BACKEND_USERS,
  URL_RUNNER,
} from "../configs/config";
import { isTokenValid } from "./Token";

const addAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        if (!isTokenValid(token)) {
          console.log("Token expired. Redirecting to login...");
          sessionStorage.removeItem("token");
          window.location.href = "/"; // Redirige al login
          throw new Error("Token expired");
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export const apiProblems = axios.create({
  baseURL: URL_BACKEND_PROBLEMS,
});

export const apiUsers = axios.create({
  baseURL: URL_BACKEND_USERS,
});

export const apiRunner = axios.create({
  baseURL: URL_RUNNER,
});

export const apiContests = axios.create({
  baseURL: URL_BACKEND_CONTESTS,
});

export const apiStats = axios.create({
  baseURL: URL_BACKEND_STATS,
});

addAuthInterceptor(apiProblems);
addAuthInterceptor(apiUsers);
addAuthInterceptor(apiRunner);
addAuthInterceptor(apiContests);
addAuthInterceptor(apiStats);
