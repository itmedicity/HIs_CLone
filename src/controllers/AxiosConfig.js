import axios from "axios";
import {toast} from "react-toastify";

// Configurable via REACT_APP_API_URL — see .env.development / .env.production
// (CRA loads the right one automatically for `npm start` vs `npm run build`).
// The fallback below only applies if that variable is somehow unset.
const BASE_URL = process.env.REACT_APP_API_URL || "http://192.168.22.170:6001/api";

export const axiosinstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en-GB,en",
  },
});

let isUnauthorizedToastShown = false;

// The API sometimes reports an expired/invalid token as a body-level
// `{status: 102, message: "Invalid Token"}` payload (HTTP 200) instead of a
// real 401, so it has to be detected by shape rather than by status code.
const isInvalidTokenPayload = (data) => Boolean(data && typeof data === "object" && (data.status === 102 || /invalid token/i.test(data.message || "")));

const logoutOnInvalidToken = (message) => {
  if (isUnauthorizedToastShown) return;
  isUnauthorizedToastShown = true;

  toast.error(message || "Your session has expired. Please login again.");
  localStorage.removeItem("usrCred");

  setTimeout(() => {
    window.location.href = "/";
  }, 1200);
};

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
  (response) => {
    if (isInvalidTokenPayload(response.data)) {
      logoutOnInvalidToken(response.data.message);
      // Swallow the payload so calling code never sees it and can't crash
      // on missing fields (e.g. `.map()` on undefined) while we log out.
      return new Promise(() => {});
    }

    return response;
  },

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

    if (isInvalidTokenPayload(data)) {
      logoutOnInvalidToken(data.message);
      return new Promise(() => {});
    }

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
