import axios, { AxiosInstance } from "axios";

const host = import.meta.env.VITE_API_URL;

export const customAxios: AxiosInstance = axios.create({
  baseURL: host, // 기본 서버 주소 입력
});
