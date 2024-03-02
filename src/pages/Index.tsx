import React, { useEffect, useState } from 'react';

import { GetData, MainListGet } from '../api/IndexApi';
import { BannerSwiper, ResearchSwiper } from '../component/MainSwiper';
import { MainPageStore } from '../store/store';
import { Appbar } from '../stories/appbar/Appbar';
import icArrowDown from '../stories/assets/ic_arrow_down.svg';
import icSearch from '../stories/assets/ic_search.svg';
import Card from '../stories/card/Card';
import { Dropdown } from '../stories/dropdown/Dropdown';
import Typography from '../stories/typography/Typography';
import { formatDateString } from '../utils/dateUtils';

import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [mainList, setMainList] = useState<GetData[]>([]);
  const { searchText, setSearchText } = MainPageStore(); // store 불러옴

  const navigate = useNavigate();

  useEffect(() => {
    const getMainList = async () => {
      try {
        const params = { page: 1, limit: 30 };
        const result = await MainListGet(params);
        setMainList(result.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    document.body.style.backgroundColor = '#FFFFFF';

    getMainList();
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

          <Dropdown
            defaultValue='성별'
            isArrow
            onDropdownChange={() => {}}
            state='default'
            oneSelect
            menu={[
              { key: 'recent', label: '전체' },
              { key: 'popular', label: '남성' },
              { key: 'job', label: '여성' },
            ]}
          />

          <Dropdown
            defaultValue='연령'
            isArrow
            onDropdownChange={() => {}}
            state='default'
            oneSelect
            menu={[
              { key: 'recent', label: '10대' },
              { key: 'popular', label: '20대' },
              { key: 'job', label: '30대' },
              { key: 'job', label: '40대' },
              { key: 'job', label: '50대' },
              { key: 'job', label: '60대' },
              { key: 'job', label: '70대' },
              { key: 'job', label: '80대' },
              { key: 'job', label: '80대 이상' },
            ]}
          />

          <Dropdown
            defaultValue='종류'
            isArrow
            onDropdownChange={() => {}}
            state='default'
            oneSelect
            menu={[
              { key: 'recent', label: '전체' },
              { key: 'popular', label: '설문조사' },
              { key: 'job', label: '인터뷰' },
              { key: 'job', label: '유저테스트' },
            ]}
          />

          <Dropdown
            defaultValue='진행 방식'
            isArrow
            onDropdownChange={() => {}}
            state='default'
            oneSelect
            menu={[
              { key: 'recent', label: '전체' },
              { key: 'popular', label: '온라인' },
              { key: 'job', label: '오프라인' },
              { key: 'job', label: '온오프라인 병행 ' },
            ]}
          />
        </div>

        <div className='flex flex-wrap gap-4'>
          {mainList.map((params) => (
            <Card
              key={params.id}
              id={params.id}
              nickname={params.author.nickname}
              size='main'
              createdAt={params.createdAt}
              enddate={formatDateString(params.endDate)}
              onClick={() => navigate(`view/${params.id}`)}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (
                  (e as React.KeyboardEvent).key === 'Enter' ||
                  (e as React.KeyboardEvent).key === 'Space'
                ) {
                  navigate(`/view/${params.id}`);
                }
              }}
            >
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
