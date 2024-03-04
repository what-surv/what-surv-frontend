import { axiosBaseUrl } from './axiosConfig';

// 댓글 작성 후 서버로 보내는 axios
export const PostComment = async (postId: number, comment: string) => {
  try {
    const response = await axiosBaseUrl.post(`/posts/${postId}/comments`, {
      content: comment,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// 댓글 정보 가져오기
export const getComment = async (postId: number) => {
  try {
    const response = await axiosBaseUrl.get(`/posts/${postId}/comments`);

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
