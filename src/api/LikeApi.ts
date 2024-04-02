import axios from 'axios';

import { axiosBaseUrl } from './axiosConfig';

interface LikePostId {
  postId: number;
}

export const LikePost = async (
  postId: number | string
): Promise<LikePostId> => {
  try {
    const likePost = await axiosBaseUrl.post(
      `/posts/${postId.toString()}/like`,
      {}
    );

    return likePost.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('Unauthorized');
    }
    throw error;
  }
};

export const LikeGet = async (postId: number) => {
  try {
    const likeGet = await axiosBaseUrl.get(`/posts/${postId.toString()}/like`);
    return likeGet.data;
  } catch (error) {
    alert('로그인 하셔야 합니다!');
    throw error;
  }
};

export const LikeDelete = async (
  postId: number | string
): Promise<LikePostId> => {
  try {
    const likeDelete = await axiosBaseUrl.delete(`/posts/${postId}/like`);
    console.log(likeDelete);

    return likeDelete.data;
  } catch (error) {
    alert('로그인 하셔야 합니다!');
    throw error;
  }
};
