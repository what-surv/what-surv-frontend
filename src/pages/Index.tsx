import React, { useEffect, useState } from 'react';

import { GetData, GetMainData, getMainList } from '../api/IndexApi';
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
import ScrollObserver from '../utils/ScrollObserver';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const {
    currentPage,
    totalPage,
    selects,
    setCurrentPage,
    setTotalPage,
    setSelects,
  } = MainPageStore(); // store 불러옴
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#FFFFFF';

    return () => {
      document.body.style.backgroundColor = '#F2F3F7';
    };
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['postList'],
    queryFn: ({ pageParam = 1 }) => {
      // 서버에 요청을 보낼 때 pageParam을 활용
      return getMainList({ page: pageParam, limit: checkDeviceReturnLimit() });
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.currentPage + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  // 디바이스 체크해서 limit에 전달  PC : 24, Mobile : 7
  const checkDeviceReturnLimit = () => {
    if (window.innerWidth < 768) {
      return 7; // mobile
    }
    return 8; // PC
  };

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

    // 생성된 상태를 기반으로 쿼리스트링 생성
    // const queryParams = Object.keys(selects)
    //   .filter((queryKey) => selects[queryKey] !== undefined)
    //   .map(
    //     (queryKey) =>
    //       `${encodeURIComponent(queryKey)}=${encodeURIComponent(selects[queryKey]!)}`
    //   )
    //   .join('&');

    // const currentUrl = window.location.href;
    // const updatedUrl = currentUrl.includes('?')
    //   ? `${currentUrl}&${queryParams}`
    //   : `${currentUrl}?${queryParams}`;

    // // 새로운 URL로 페이지 업데이트
    // window.history.pushState({}, '', updatedUrl);
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

        <div className='flex flex-wrap mb-6 gap-3'>{renderDropDowns()}</div>

        <div className='flex flex-wrap gap-4'>
          {data?.pages.map((page) =>
            page.data.map((params) => {
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
            })
          )}
        </div>
        {/* // IT전체 */}
        <div className='text-center mt-[42px]'>
          {hasNextPage && (
            <button
              type='button'
              className='px-6 py-4 w-[340px] bg-[#E5E7ED] rounded-[400px] text-lg text-[#545760]'
              onClick={() => fetchNextPage()}
            >
              <div className='flex justify-center w-full gap-2'>
                <p>더보기</p>
                <img src={icArrowDown} alt='더보기 버튼 아이콘' />
              </div>
            </button>
          )}
        </div>
        <ScrollObserver onIntersection={() => fetchNextPage()} />
      </div>
    </div>
  );
};

export default Index;
