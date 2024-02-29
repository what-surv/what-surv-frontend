import React, { useEffect } from 'react';

import { BannerSwiper, ResearchSwiper } from '../component/MainSwiper';
import { MainPageStore } from '../store/store';
import icArrowDown from '../stories/assets/ic_arrow_down.svg';
import icComment from '../stories/assets/ic_comment.svg';
import icEye from '../stories/assets/ic_eye.svg';
import icSearch from '../stories/assets/ic_search.svg';
import icUser from '../stories/assets/ic_usersvg.svg';
import { Badge } from '../stories/badge/Badge';
import { Dropdown } from '../stories/dropdown/Dropdown';
import Like from '../stories/like/Like';
import Typography from '../stories/typography/Typography';

import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { searchText, setSearchText } = MainPageStore(); // store 불러옴

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#FFFFFF';

    return () => {
      document.body.style.backgroundColor = '#F2F3F7';
    };
  }, []);
  // searchInput onChange
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const searchOnClick = () => {
    alert('asd');
  };
  return (
    <div>
      <div className='flex justify-center'>
        <div className='flex relative max-w-[1058px] w-full items-center'>
          <p className='mr-6'>리서치 검색하기</p>
          <input
            type='text'
            onChange={onChange}
            value={searchText}
            placeholder='리서치를 검색해 보세요!'
            className='w-[calc(100%-125px)] px-10 py-4 border-2 border-[#C1C5CC] rounded-[20px] text-2xl'
          />
          <button
            type='button'
            onClick={searchOnClick}
            className='absolute right-10'
          >
            <img src={icSearch} alt='asd' />
          </button>
        </div>
      </div>
      {/* slider */}
      <div className='my-6'>
        <BannerSwiper />
      </div>
      {/* // slider */}

      {/* 인기리서치 */}
      <ResearchSwiper />

      {/* // 인기리서치 */}

      {/* IT전체 */}
      <div className='mt-6 mb-3'>
        <Typography size='base' text='IT전체' weight='Semibold' />
      </div>

      <div className='flex mb-6'>
        <Dropdown
          defaultValue='정렬'
          isArrow
          onDropdownChange={() => {}}
          state='default'
          oneSelect
          menu={[
            { key: 'recent', label: '최신순' },
            { key: 'popular', label: '인기순' },
            { key: 'job', label: '직종순' },
          ]}
        />
      </div>

      <div className='flex flex-wrap gap-4'>
        <div
          onClick={() => navigate('/view/0')}
          className='w-[calc(25%-12px)] border border-[#C1C5CC] rounded-[16px] p-5'
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Space') {
              navigate('/view/0');
            }
          }}
          role='button'
          tabIndex={0}
        >
          <div className='flex items-center justify-between'>
            <div className='flex gap-3'>
              <Badge size='default' state='main'>
                설문조사
              </Badge>
              <Badge size='default' state='sub'>
                New
              </Badge>
            </div>
            <Like onClickCallback={(state: boolean) => console.log(state)} />
          </div>
          <div className='flex items-center my-4 gap-[8px]'>
            <span className='text-[#676A72] text-sm'>마감일</span>
            <span className='w-[1px] h-[12px] bg-[#545760]' />
            <span className='text-[#676A72] text-sm'>2024.01.01</span>
          </div>
          <p className='text-left line-clamp-2'>
            국회가 재적의원 과반수의 찬성으로 계엄의 해제를 요구한 때에는
            대통령은 이를 해제하여야 한다. 대법관의
          </p>
          <div className='flex justify-between mt-[14px] mt-9 pt-4 border-t border-[#D7DBE2]'>
            <div className='flex'>
              <p className='mr-[10px]'>
                <img src={icUser} alt='유저 이미지' />
              </p>
              <p>닉네임</p>
            </div>
            <div className='flex'>
              <p className='flex items-center mr-[4px] '>
                <img src={icEye} alt='눈 아이콘' />
              </p>
              <p className='mr-[6px] text-[#808490]'>99</p>
              <p className='flex items-center mr-[4px]'>
                <img src={icComment} alt='댓글 아이콘' />
              </p>
              <p className='text-[#808490]'>99</p>
            </div>
          </div>
        </div>
      </div>
      {/* // IT전체 */}
      <div className='text-center mt-[42px]'>
        <button
          type='button'
          className='px-6 py-4 w-[340px] bg-[#E5E7ED] rounded-[400px] text-lg text-[#545760]'
        >
          <div className='flex w-full justify-center gap-2'>
            <p>더보기</p>
            <img src={icArrowDown} alt='더보기 버튼 아이콘' />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Index;
