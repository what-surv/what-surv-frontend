import { axiosBaseUrl } from './axiosConfig';

export const mainSortArr = [
  { key: 'recent', label: '최신순' },
  { key: 'popular', label: '인기순' },
  { key: 'deadline', label: '마감임박순' },
];

export const mainGenderArr = [
  { key: 'All', label: '전체' },
  { key: 'Male', label: '남성' },
  { key: 'Female', label: '여성' },
];

export const mainAgeArr = [
  { key: 'All', label: '전체' },
  { key: '10-19', label: '10대' },
  { key: '20-29', label: '20대' },
  { key: '30-39', label: '30대' },
  { key: '40-49', label: '40대' },
  { key: '50-59', label: '50대' },
  { key: '60-69', label: '60대' },
  { key: '70-79', label: '70대' },
  { key: '80+', label: '80대 이상' },
];

export const mainTypeArr = [
  { key: 'All', label: '전체' },
  { key: 'survey', label: '설문조사' },
  { key: 'interview', label: '인터뷰' },
  { key: 'userTest', label: '유저테스트' },
  { key: 'other', label: '기타' },
];

export const mainMethodArr = [
  { key: 'All', label: '전체' },
  { key: 'online', label: '온라인' },
  { key: 'offline', label: '오프라인' },
  { key: 'onlineOffline', label: '온오프라인 병행' },
];

interface GetMainListParams {
  page: number;
  limit: number;
  sort?: string;
  gender?: string;
  age?: string;
  type?: string;
  method?: string;
}

export interface isLikedTypes {
  data: isLikedData;
  status: string;
}

interface isLikedData {
  isLiked: boolean;
  postId: string;
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
  researchType: string[];
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
  commentCount?: number;
  isLiked: boolean;
  nextPage: number;
  page: number;
  totalPages: number;
  researchTypes: [string];
  data: [];
};

export const getMainList = async (params: GetMainListParams) => {
  const MainList = await axiosBaseUrl.get('/posts', {
    params,
  });

  return MainList.data;
};

export const getPopularList = async () => {
  const popularList = await axiosBaseUrl.get('/posts/popular');

  return popularList.data;
};
