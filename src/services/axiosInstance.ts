import axios from "axios";

import { getCookie } from "@/utils/cookie";

const axiosInstance = axios.create({
  baseURL: "https://bean-talk-server.vercel.app",
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