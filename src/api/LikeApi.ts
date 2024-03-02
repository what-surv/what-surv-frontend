import { axiosBaseUrl } from './axiosConfig';

interface LikePostId {
  postId: number;
}

export const LikePost = async (postId: number): Promise<LikePostId> => {
  try {
    const likePost = await axiosBaseUrl.post(`/posts/${postId}/like`, {});

    return likePost.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const LikeGet = async (postId: number) => {
  try {
    const likeGet = await axiosBaseUrl.get(`/posts/${postId}/like`);
    return likeGet.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const LikeDelete = async (postId: number): Promise<LikePostId> => {
  try {
    const likeDelete = await axiosBaseUrl.delete(`/posts/${postId}/like`);

    return likeDelete.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
