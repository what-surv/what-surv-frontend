import { axiosBaseUrl } from './axiosConfig';

interface GetMainListParams {
  currentPage: number;
  limit: number;
}

// 받는 데이터
export type GetMainData = {
  postId: number;
  authorNickname: string;
  createdAt: string;
  title: string;
  endDate: string;
  viewCount: number;
  commentCount: number;
  isLiked: boolean;
};

export const MainListGet = async (params: GetMainListParams) => {
  const MainList = await axiosBaseUrl.get('/posts', {
    params,
  });

  return MainList;
};
