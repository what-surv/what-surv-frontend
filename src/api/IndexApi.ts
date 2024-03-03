import { axiosBaseUrl } from './axiosConfig';

interface GetMainListParams {
  page: number;
  limit: number;
}

// 받는 데이터
export type GetMainData = {
  isLiked: boolean;
  postAges: string;
  postAuthorId: number;
  postContent: string;
  postCreatedAt: string;
  postDeletedAt: string | null;
  postDuration: string;
  postEndDate: string;
  postGender: string;
  postId: number;
  postProcedure: string;
  postResearchType: string;
  postTitle: string;
  postUpdatedAt: string;
  postUrl: string;
  postViewCount: number;
};

export const MainListGet = async (params: GetMainListParams) => {
  const MainList = await axiosBaseUrl.get('/posts', {
    params,
  });

  return MainList;
};
