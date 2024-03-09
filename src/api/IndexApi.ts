import { axiosBaseUrl } from './axiosConfig';

interface GetMainListParams {
  page: number;
  limit: number;
}

// 받는 데이터
export type GetData = {
  ages: string[];
  author: {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    email: string;
    provider: string;
    providerId: string;
    role: string;
    createdDate: string;
    nickname: string;
    gender: string;
    job: string;
    birthDate: string;
  };
  isLiked: boolean;
  birthDate: string | null;
  createdAt: string;
  createdDate: string;
  deletedAt: string | null;
  email: string;
  gender: string;
  id: number;
  job: string;
  nickname: string;
  provider: string;
  providerId: string;
  role: string;
  updatedAt: string;
  content: string;
  duration: string;
  endDate: string;
  procedure: string;
  researchType: string;
  title: string;
  url: string;
  viewCount: string;
};

// 받는 데이터
export type GetMainData = {
  postId: number;
  authorNickname: string;
  createdAt: string;
  title: string;
  url: string;
  viewCount: string;
  endDate: string;
  commentCount: number;
  isLiked: boolean;
  nextPage: number;
  page: number;
};

export const getMainList = async (params: GetMainListParams) => {
  const MainList = await axiosBaseUrl.get('/posts', {
    params,
  });

  return MainList.data;
};
