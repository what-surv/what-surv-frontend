import { axiosBaseUrl } from './axiosConfig';

interface GetMainListParams {
  page: number;
  limit: number;
  sort?: string;
  gender?: string;
  age?: string;
  type?: string;
  method?: string;
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
  endDate: Date;
  procedure: string;
  researchType: string;
  title: string;
  url: string;
  viewCount: string;
};

export interface postArrayProps {
  data: GetMainData[];
}

// 받는 데이터
export type GetMainData = {
  id: number;
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
  totalPages: number;
  data: [];
};

export const getMainList = async (params: GetMainListParams) => {
  const MainList = await axiosBaseUrl.get('/posts', {
    params,
  });

  return MainList.data;
};
