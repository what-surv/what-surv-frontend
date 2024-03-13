import React, { useEffect } from 'react';

import { GetMainData, getMainList } from '../api/IndexApi';
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
import Card from '../stories/card/Card';
import { Dropdown } from '../stories/dropdown/Dropdown';
import FloatingButton from '../stories/floatingButton/FloatingButton';
import { Pagination } from '../stories/indicator/pagination/Pagination';
import Like from '../stories/like/Like';
import { Tabbar } from '../stories/tabbar/Tabbar';
import Typography from '../stories/typography/Typography';
import { formatDateString } from '../utils/dateUtils';

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { currentPage, setCurrentPage, setSelects } = MainPageStore(); // store 불러옴
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#F9F9FB';

    return () => {
      document.body.style.backgroundColor = '#F2F3F7';
    };
  }, []);

  // 디바이스 체크해서 limit에 전달  PC : 24, Mobile : 7
  const checkDeviceReturnLimit = () => {
    if (window.innerWidth < 768) {
      return 7; // mobile
    }
    return 24; // PC
  };

  const { data, refetch, isLoading } = useQuery<GetMainData>({
    queryKey: ['postList', currentPage],
    queryFn: () =>
      getMainList({
        page: currentPage,
        limit: checkDeviceReturnLimit(),
      }),
  });

  if (isLoading) {
    return null;
  }

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
    refetch();
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

  console.log(data);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='relative'>
      <Appbar
        isAccount
        isFullLogo
        isLogo
        isSearch
        onArrowClick={() => {}}
        size='full'
      />
      <Tabbar isMobileVisible size='default' />
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

        <div className='flex flex-wrap gap-3 mb-6'>{renderDropDowns()}</div>

        <div className='relative flex flex-wrap gap-4'>
          {data?.data.map((params: GetMainData) => {
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
                cardStyle='default'
                createdAt={createdAt}
                enddate={formatDateString(endDate)}
                onClick={() => navigate(`view/${postId}`)}
                type='default'
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === 'Enter' || e.key === 'Space') {
                    navigate(`/view/${postId}`);
                  }
                }}
                viewCount={Number(viewCount)}
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
        {data && (
          <Pagination
            pageClick={handlePageChange}
            totalPage={data.totalPages}
            currentPage={currentPage}
          />
        )}
      </div>
      <div className='fixed bottom-[50px] right-[13%] z-[100]'>
        <FloatingButton onClick={() => navigate('write')} />
      </div>
    </div>
  );
};

export default Index;
