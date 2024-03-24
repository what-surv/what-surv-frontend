import { axiosBaseUrl } from './axiosConfig';

export const postQuit = async (data: string) => {
  await axiosBaseUrl.post(`/auth/quit`, data);
};
