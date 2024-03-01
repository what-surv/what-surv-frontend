import axios from 'axios';

interface GetMainListParams {
  page: number;
  limit: number;
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
  endDate: string;
  procedure: string;
  researchType: string;
  title: string;
  url: string;
};

export const MainListGet = async (params: GetMainListParams) => {
  const MainList = await axios.get(`${import.meta.env.VITE_SERVER_URL}/posts`, {
    params,
  });

  return MainList;
};
