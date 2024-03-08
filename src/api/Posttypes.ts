export interface profileTypes {
  data: profileData;
  status: string;
}

export interface profileData {
  nickname: string;
  email: string;
  id: string;
}

export interface UserTypes {
  id: string;
  nickname: string;
  privider: string;
  role: string;
  updatedAt: string;
  provierId: string;
  birthDate: string;
  createdAt: Date;
  gender: string;
}
