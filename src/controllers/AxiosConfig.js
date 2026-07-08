import axios from "axios";
import {DEV_API_URL, PRODUCTION_API_URL} from "../Constant/Static";
import {toast} from "react-toastify";

// axios.defaults.baseURL = DEV_API_URL;
const BASE_URL = DEV_API_URL;

export const axiosinstance = axios.create({
  baseURL: DEV_API_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en-GB,en",
  },
});

let isUnauthorizedToastShown = false;

/**
 * REQUEST INTERCEPTOR
 */

axiosinstance.interceptors.request.use(
  (config) => {
    const userLogincred = localStorage.getItem("usrCred");

    if (userLogincred) {
      const {token} = JSON.parse(userLogincred);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * RESPONSE INTERCEPTOR
 */
axiosinstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        toast.error("Request timeout. Please try again.");
      } else {
        toast.error("Unable to connect to the server.");
      }

      return Promise.reject(error);
    }

    const {status, data} = error.response;

    switch (status) {
      case 400:
        toast.error(data?.message || "Bad Request");
        break;

      case 401:
        if (!isUnauthorizedToastShown) {
          isUnauthorizedToastShown = true;

          toast.error(data?.message || "Session expired. Please login again.");

          setTimeout(() => {
            isUnauthorizedToastShown = false;
          }, 3000);

          // Uncomment if you want automatic logout
          // localStorage.removeItem("usrCred");
          // window.location.href = "/login";
        }
        break;

      case 403:
        toast.error(data?.message || "Access Denied");
        break;

      case 404:
        toast.error(data?.message || "Requested resource not found.");
        break;

      case 409:
        toast.warning(data?.message || "Conflict occurred.");
        break;

      case 422:
        toast.warning(data?.message || "Validation failed.");
        break;

      case 429:
        toast.warning("Too many requests. Please wait.");
        break;

      case 500:
        toast.error(data?.message || "Internal Server Error.");
        break;

      case 502:
        toast.error("Bad Gateway.");
        break;

      case 503:
        toast.error("Service Unavailable.");
        break;

      case 504:
        toast.error("Gateway Timeout.");
        break;

      default:
        toast.error(data?.message || `Unexpected Error (${status})`);
    }

    if (process.env.NODE_ENV === "development") {
      console.error("Axios Error:", error);
    }

    return Promise.reject(error);
  },
);

export default axiosinstance;
