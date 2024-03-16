import React from 'react';

import { axiosBaseUrl } from '../api/axiosConfig';
import PostListSelect from '../molecules/PostListSelect';
import LikeCardList from '../organisms/LikeCardList';
import { Appbar } from '../stories/appbar/Appbar';
import { Tabbar } from '../stories/tabbar/Tabbar';

import { useQuery } from '@tanstack/react-query';

interface ButtonInfo {
  label: string;
  url: string;
  key: string;
}

const buttonValues: ButtonInfo[] = [
  { label: '관심 표시한 글', url: '/users/me/likes', key: 'like' },
];

const InterestArticlesPage = () => {
  const { data: isLikePost, isLoading } = useQuery({
    queryKey: ['isLikePost'],
    queryFn: () => axiosBaseUrl.get('users/me/likes'),
  });

  if (isLoading) {
    return null;
  }
  console.log(isLikePost);
  return (
    <div className='w-full'>
      <div className='w-full header'>
        <Appbar isLogo isAccount />
        <Tabbar />
      </div>
      <div className=' pt-4 md:pt-14 mx-auto w-[90%] md:w-[80%]'>
        <PostListSelect buttonValues={buttonValues} />

        <div className='inline-flex items-start justify-center w-full mx-muto main-content '>
          <LikeCardList />
        </div>
      </div>
    </div>
  );
};

export default InterestArticlesPage;
