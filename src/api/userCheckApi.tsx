import { axiosBaseUrl } from './axiosConfig';

export const userCheckApi = async () => {
  try {
    const userCheck = await axiosBaseUrl.get(`/auth/profile`);
    // userCheck.status가 200이면 true를 반환
    return userCheck.status === 200;
  } catch (error) {
    // 에러가 발생하면 false를 반환
    return false;
  }
};

export const getUserInfoApi = async () => {
  try {
    const data = await axiosBaseUrl.get(`/auth/profile`);
    // userCheck.status가 200이면 true를 반환
    return data.data;
  } catch (error) {
    // 에러가 발생하면 false를 반환
    return false;
  }
};
