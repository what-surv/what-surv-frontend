import { axiosBaseUrl } from './axiosConfig';

export interface UserInfo {
  nickname: string;
  phone: undefined;
  gender: string;
  advertisingConsent: boolean;
  birthDate: string;
}

export type userInfoData = {
  nickname: string;
  phone: undefined;
  gender: string;
  advertisingConsent: boolean;
  birthDate: string;
};

export const checkAuth = async (path: string, nextStepHandler: () => void) => {
  await axiosBaseUrl.get(`/auth/${path}`);
  nextStepHandler();
};

export const requestNickName = async (nickName: string) => {
  const isNicknameValid = await axiosBaseUrl.get(
    `/users/nickname-exists?nickname=${nickName}`
  );
  return isNicknameValid.data;
};

export const userRegistration = async (
  params: userInfoData,
  nextStepHandler: () => void
) => {
  await axiosBaseUrl.post(`/auth/sign-up`, params);
  nextStepHandler();
};
