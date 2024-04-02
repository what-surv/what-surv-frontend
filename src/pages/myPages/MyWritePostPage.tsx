import { useState } from 'react';

import PostListSelect from '../../molecules/PostListSelect';
import MyPostsList from '../../organisms/post/mypage/MyPostsList';
import { Appbar } from '../../stories/appbar/Appbar';
import { Tabbar } from '../../stories/tabbar/Tabbar';

interface ButtonInfo {
  label: string;
  url: string;
  key: string;
}

const buttonValues: ButtonInfo[] = [
  { label: '내 모집 글', url: 'users/me/posts', key: 'myposts' },
];

const MyWritePostPage = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='w-full'>
      <div className='w-full header'>
        <Appbar isLogo isAccount />
        <Tabbar />
      </div>
      <div className='pt-4 md:pt-14 mx-auto w-[90%] md:w-[85%]'>
        <div className='w-[95%] md:min-w-[980px] full:max-w-[1416px] mx-auto'>
          <PostListSelect
            buttonValues={buttonValues}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            showIsEdit
          />
        </div>

        <div className='flex justify-center w-full'>
          <MyPostsList isEdit={isEdit} />
        </div>
      </div>
    </div>
  );
};

export default MyWritePostPage;
