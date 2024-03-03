import { axiosBaseUrl } from './axiosConfig';

export const PostComment = async (postId: number, comment: string) => {
  try {
    const response = await axiosBaseUrl.post(`/posts/1/comments`, {
      content: comment,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const testLogin = async () => {
  try {
    const response = await axiosBaseUrl.post(
      `http://localhost:3000/auth/mock-login/2`,
      {
        username: 'user',
        password: 'userpw',
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
