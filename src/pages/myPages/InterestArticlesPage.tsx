import React from 'react';

import PostListSelect from '../../molecules/PostListSelect';
import LikeCardList from '../../organisms/post/mypage/LikeCardList';
import { Appbar } from '../../stories/appbar/Appbar';
import { Tabbar } from '../../stories/tabbar/Tabbar';

interface ButtonInfo {
  label: string;
  url: string;
  key: string;
}

const buttonValues: ButtonInfo[] = [
  { label: '관심 표시한 글', url: '/users/me/likes', key: 'like' },
];

const InterestArticlesPage = () => {
  return (
    <div className='w-full'>
      <div className='w-full header'>
        <Appbar isLogo isAccount />
        <Tabbar />
      </div>
      <div className=' pt-4 md:pt-14 mx-auto w-[90%] md:w-[85%]'>
        <div className='w-[90%]'>
          <PostListSelect buttonValues={buttonValues} />
        </div>

        <div className='flex justify-center w-full main-content'>
          <LikeCardList />
        </div>
      </div>
    </div>
  );
};

export default InterestArticlesPage;
