import axios, { AxiosInstance } from 'axios';

export const axiosBaseUrl: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  withCredentials: true,
});
