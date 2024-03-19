import { axiosBaseUrl } from './axiosConfig';

export const userCheckApi = async () => {
  try {
    const userCheck = await axiosBaseUrl.get(`/auth/profile`);

    return userCheck.data;
  } catch (error) {
    alert('로그인 하셔야 합니다!');
    throw error;
  }
};
