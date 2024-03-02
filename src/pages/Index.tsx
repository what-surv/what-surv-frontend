import React, { useEffect, useState } from 'react';

import { GetData, MainListGet } from '../api/IndexApi';
import { LikeGet } from '../api/LikeApi';
import { BannerSwiper, ResearchSwiper } from '../component/MainSwiper';
import { MainPageStore } from '../store/store';
import { Appbar } from '../stories/appbar/Appbar';
import icArrowDown from '../stories/assets/ic_arrow_down.svg';
import icSearch from '../stories/assets/ic_search.svg';
import Card from '../stories/card/Card';
import { Dropdown } from '../stories/dropdown/Dropdown';
import Like from '../stories/like/Like';
import Typography from '../stories/typography/Typography';
import { formatDateString } from '../utils/dateUtils';

import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [mainCardList, setMainCardList] = useState<GetData[]>([]);
  const { searchText, setSearchText } = MainPageStore(); // store 불러옴

  const navigate = useNavigate();

  useEffect(() => {
    const getMainCardList = async () => {
      try {
        const params = { page: 1, limit: 30 };
        const result = await MainListGet(params);

        const updatedData = await Promise.all(
          result.data.data.map(async (params2: GetData) => {
            // 현재 포스트의 좋아요 상태 가져오기
            const isLikedResult = await LikeGet(params2.id);
            // 현재 포스트 정보에 좋아요 상태 추가하여 반환
            return { ...params2, isLiked: isLikedResult.isLiked };
          })
        );

        setMainCardList(updatedData);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    getMainCardList();

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
      <Appbar
        isAccount
        isFullLogo
        isLogo
        isSearch
        onArrowClick={() => {}}
        size='full'
      />
      <div className='max-w-[1416px] w-full m-auto'>
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

        <div className='flex mb-6 gap-3'>
          <Dropdown
            defaultValue='정렬'
            isArrow
            onDropdownChange={() => {}}
            state='default'
            oneSelect
            menu={[
              { key: 'recent', label: '최신순' },
              { key: 'popular', label: '인기순' },
              { key: 'job', label: '마감임박순' },
            ]}
          />
        </div>

        <div className='flex flex-wrap gap-4'>
          {mainCardList.map((params) => (
            <Card
              key={params.id}
              id={params.id}
              nickname={params.author.nickname}
              size='main'
              createdAt={params.createdAt}
              enddate={formatDateString(params.endDate)}
              onClick={() => navigate(`view/${params.id}`)}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === 'Space') {
                  navigate(`/view/${params.id}`);
                }
              }}
            >
              <span className='absolute top-[25px] right-[21px]'>
                <Like
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                  }}
                  isLiked={params.isLiked}
                />
              </span>
              {params.title}
            </Card>
          ))}
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
    </div>
  );
};

export default Index;
