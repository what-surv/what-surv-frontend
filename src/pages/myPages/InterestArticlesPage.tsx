import React from 'react';

import PostListSelect from '../../molecules/PostListSelect';
import LikePostList from '../../organisms/post/mypage/LikePostList';
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
      <div className='pt-4 md:pt-14 mx-auto w-[90%] md:w-[85%]'>
        <div className='w-[95%] md:min-w-[980px] full:max-w-[1416px] mx-auto'>
          <PostListSelect buttonValues={buttonValues} />
        </div>

        <div className='flex justify-center w-full'>
          <LikePostList />
        </div>
      </div>
    </div>
  );
};

export default InterestArticlesPage;
