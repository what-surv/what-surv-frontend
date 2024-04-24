import { axiosBaseUrl } from './axiosConfig';

// 댓글 정보 가져오기
export const getComment = async (postId: string) => {
  const response = await axiosBaseUrl.get(`/posts/${postId}/comments`);
  return response.data;
};

// 글 정보 가져오기
export const getPost = async (postId: string) => {
  const response = await axiosBaseUrl.get(`/posts/${postId}`);
  return response.data;
};

// export const testLogin = async () => {
//   try {
//     const response = await axiosBaseUrl.post(
//       `http://localhost:3000/auth/mock-login/2`,
//       {
//         username: 'user',
//         password: 'userpw',
//       }
//     );
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
