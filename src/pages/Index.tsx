import React, { useEffect, useState } from 'react';

import { GetMainData, MainListGet } from '../api/IndexApi';
import { LikeDelete, LikePost } from '../api/LikeApi';
import { BannerSwiper, ResearchSwiper } from '../component/MainSwiper';
import {
  ageArr,
  genderArr,
  methodArr,
  sortArr,
  typeArr,
} from '../organisms/post/write/DropdownValue';
import { MainPageStore } from '../store/store';
import { Appbar } from '../stories/appbar/Appbar';
import icArrowDown from '../stories/assets/ic_arrow_down.svg';
// import icSearch from '../stories/assets/ic_search.svg';
import Card from '../stories/card/Card';
import { Dropdown } from '../stories/dropdown/Dropdown';
import Like from '../stories/like/Like';
import Typography from '../stories/typography/Typography';
import { formatDateString } from '../utils/dateUtils';

import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [mainCardList, setMainCardList] = useState<GetMainData[]>([]);
  const {
    currentPage,
    totalPage,
    selects,
    setCurrentPage,
    setTotalPage,
    setSelects,
  } = MainPageStore(); // store 불러옴

  const navigate = useNavigate();

  // 디바이스 체크해서 limit에 전달  PC : 24, Mobile : 7
  const checkDevice = () => {
    if (window.innerWidth < 768) {
      return 7;
    }
    return 2;
  };

  const getMainCardList = async () => {
    try {
      const params = { currentPage, limit: checkDevice() };
      const result = await MainListGet(params);
      console.log(result.data);
      setMainCardList((prevMainCardList) => [
        ...prevMainCardList,
        ...result.data.data,
      ]);
      setTotalPage(result.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#FFFFFF';

    return () => {
      document.body.style.backgroundColor = '#F2F3F7';
    };
  }, []);

  useEffect(() => {
    getMainCardList();
  }, [currentPage]);

  // useEffect(() => {

  // }, [currentPage, selects]);

  // searchInput onChange
  /*
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const searchOnClick = () => {
    alert(searchText);
  };
  */

  const likedClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    liked: boolean
  ) => {
    e.stopPropagation();

    if (liked) {
      await LikeDelete(id);
    } else {
      await LikePost(id);
    }
    await getMainCardList();
  };

  const dropdownOptions = [
    { defaultValue: '정렬', key: 'sort', arr: sortArr },
    { defaultValue: '성별', key: 'gender', arr: genderArr },
    { defaultValue: '나이', key: 'age', arr: ageArr },
    { defaultValue: '종류', key: 'type', arr: typeArr },
    { defaultValue: '진행방식', key: 'method', arr: methodArr },
  ];

  const soltingHandler = (key: string, selectedValue: string) => {
    const selectedKey = dropdownOptions
      .find((option) => option.key === key)
      ?.arr.find((item) => item.label === selectedValue)?.key;

    setSelects({ [key]: selectedKey });
  };

  const renderDropDowns = () => {
    return dropdownOptions.map((option) => (
      <Dropdown
        key={option.key}
        defaultValue={option.defaultValue}
        isArrow
        state='default'
        oneSelect
        menu={option.arr}
        onDropdownChange={(selectedValue) =>
          soltingHandler(option.key, selectedValue)
        }
      />
    ));
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
        {/* <div className='flex justify-center'>
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
        </div> */}
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

        <div className='flex mb-6 gap-3'>{renderDropDowns()}</div>

        <div className='flex flex-wrap gap-4'>
          {mainCardList &&
            mainCardList.map((params) => {
              const {
                postId,
                authorNickname,
                title,
                createdAt,
                endDate,
                viewCount,
                commentCount,
                isLiked,
              } = params;

              return (
                <Card
                  key={postId}
                  id={postId}
                  nickname={authorNickname}
                  size='main'
                  createdAt={createdAt}
                  enddate={formatDateString(endDate)}
                  onClick={() => navigate(`view/${postId}`)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                    if (e.key === 'Enter' || e.key === 'Space') {
                      navigate(`/view/${postId}`);
                    }
                  }}
                  viewCount={viewCount}
                  commentCount={commentCount}
                >
                  <span className='absolute top-[25px] right-[21px]'>
                    <Like
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        likedClick(e, postId, isLiked)
                      }
                      isLiked={isLiked}
                    />
                  </span>
                  {title}
                </Card>
              );
            })}
        </div>
        {/* // IT전체 */}
        <div className='text-center mt-[42px]'>
          {currentPage !== totalPage && (
            <button
              type='button'
              className='px-6 py-4 w-[340px] bg-[#E5E7ED] rounded-[400px] text-lg text-[#545760]'
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <div className='flex justify-center w-full gap-2'>
                <p>더보기</p>
                <img src={icArrowDown} alt='더보기 버튼 아이콘' />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
