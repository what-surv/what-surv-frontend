import { axiosBaseUrl } from './axiosConfig';

interface GetMainListParams {
  page: number;
  limit: number;
}

// 받는 데이터
export type GetMainData = {
  postId: number;
  authorNickname: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  title: string;
  endDate: string;
  gender: string;
  ages: string[];
  researchType: string;
  url: string;
  procedure: string;
  duration: string;
  content: string;
  viewCount: number;
  commentCount: number;
  isLiked: boolean;
};

export const MainListGet = async (params: GetMainListParams) => {
  const MainList = await axiosBaseUrl.get('/posts', {
    params,
  });

  return MainList.data;
};
