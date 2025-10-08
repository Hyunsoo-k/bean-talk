import axios from "axios";

import { getCookie } from "@/cookie";

const instance = axios.create({
  baseURL: "https://bean-talk-server.vercel.app",
  headers: { "Content-Type": "application/json" }
});

instance.interceptors.request.use((config) => {
  const accessToken = getCookie("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  };

  return config;
});

export default instance;