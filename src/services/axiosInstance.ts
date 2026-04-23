import axios from "axios";

import { getCookie } from "@/utils/cookie";

const BASE_URL = import.meta.env.VITE_BEANTALK_SERVER_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getCookie("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  };
  return config;
});

export { axiosInstance };