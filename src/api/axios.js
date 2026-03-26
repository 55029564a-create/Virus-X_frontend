import axios from "axios";
import Swal from "sweetalert2";

const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";
    const isAuthRequest =
      requestUrl.includes("/api/login") ||
      requestUrl.includes("/api/signup") ||
      requestUrl.includes("/api/auth/login") ||
      requestUrl.includes("/api/auth/signup");

    if (!isAuthRequest && (status === 401 || status === 403)) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");

      Swal.fire({
        icon: "error",
        title: "세션 만료",
        text: "로그인이 만료되었습니다. 다시 로그인해주세요.",
        confirmButtonColor: "#EF4444",
      }).then(() => {
        window.location.href = "/login";
      });
    }

    return Promise.reject(error);
  },
);

export default api;
