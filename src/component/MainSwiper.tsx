import React, { useEffect, useRef, useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { GetMainData, getPopularList } from '../api/IndexApi';
import mainBannerMb1 from '../assets/banner/img-main-banner-1-mb.png';
import mainBannerPc1 from '../assets/banner/img-main-banner-1-pc.png';
import mainBannerTb1 from '../assets/banner/img-main-banner-1-tb.svg';
import mainBannerMb2 from '../assets/banner/img-main-banner-2-mb.png';
import mainBannerPc2 from '../assets/banner/img-main-banner-2-pc.png';
import mainBannerTb2 from '../assets/banner/img-main-banner-2-tb.svg';
import mainBannerMb3 from '../assets/banner/img-main-banner-3-mb.png';
import mainBannerPc3 from '../assets/banner/img-main-banner-3-pc.svg';
import mainBannerTb3 from '../assets/banner/img-main-banner-3-tb.svg';
import prevBtn from '../stories/assets/ic_arrow_left.svg';
import nextBtn from '../stories/assets/ic_arrow_right.svg';
import Card from '../stories/card/Card';
import CardSkeleton from '../stories/cardSkeleton/CardSkeleton';
import { PageIndicator } from '../stories/indicator/page indicator/PageIndicator';
import Typography from '../stories/typography/Typography';
import { formatDateString } from '../utils/dateUtils';

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const BannerSwiper = () => {
  const [totalSlides, setTotalSlides] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef() as any;

  // 페이지 인디케이터 배열 생성
  const pageIndicatorArr = Array.from({ length: totalSlides }, (_, index) => ({
    isActivate: index === activeIndex,
    pageNumber: index + 1,
  }));

  const handleIndicatorClick = (pageNumber: number) => {
    setActiveIndex(pageNumber);
    swiperRef.current?.slideToLoop(pageNumber);
  };

  return (
    <div>
      <div className='main-banner'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          grabCursor
          onInit={(swiper) => {
            setTotalSlides(swiper.slides.length);
            swiperRef.current = swiper;
          }}
          onActiveIndexChange={(index) => setActiveIndex(index.realIndex)}
          speed={1200}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
        >
          <SwiperSlide>
            <div className='img-box'>
              <img
                src={mainBannerPc1}
                alt='사용자의 니즈를 파악하고 싶다면? SurveyIT에서'
                className='hidden lg:block'
              />

              <img
                src={mainBannerTb1}
                alt='사용자의 니즈를 파악하고 싶다면? SurveyIT에서'
                className='sm:block lg:hidden'
              />

              <img
                src={mainBannerMb1}
                alt='사용자의 니즈를 파악하고 싶다면? SurveyIT에서'
                className='block sm:hidden'
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='img-box'>
              <img
                src={mainBannerPc2}
                alt='설문조사 참여하고 스타벅스 기프티콘 받기! 이벤트 기간 ~3/31일까지!'
                className='hidden lg:block'
                loading='lazy'
              />

              <img
                src={mainBannerTb2}
                alt='설문조사 참여하고 스타벅스 기프티콘 받기! 이벤트 기간 ~3/31일까지!'
                className='sm:block lg:hidden'
                loading='lazy'
              />

              <img
                src={mainBannerMb2}
                alt='설문조사 참여하고 스타벅스 기프티콘 받기! 이벤트 기간 ~3/31일까지!'
                className='block sm:hidden'
                loading='lazy'
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='img-box'>
              <img
                src={mainBannerPc3}
                alt='SurveyIT에 대한 의견을 보내주세요!'
                className='hidden lg:block'
                loading='lazy'
              />

              <img
                src={mainBannerTb3}
                alt='SurveyIT에 대한 의견을 보내주세요!'
                className='sm:block lg:hidden'
                loading='lazy'
              />

              <img
                src={mainBannerMb3}
                alt='SurveyIT에 대한 의견을 보내주세요!'
                className='block sm:hidden'
                loading='lazy'
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className='flex justify-center'>
        <PageIndicator
          size='desktop'
          page={pageIndicatorArr}
          onIndicatorClick={handleIndicatorClick}
        />
      </div>
    </div>
  );
};

export const ResearchSwiper = () => {
  const [showLoader, setShowLoader] = useState(true);

  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef() as any;

  const { data, isLoading } = useQuery({
    queryKey: ['popularList'],
    queryFn: () => getPopularList(),
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowLoader(false); // 1.2초 후에 로딩 스피너를 숨김
    }, 1200);

    return () => clearTimeout(delay); // cleanup 함수를 이용하여 타이머 해제
  }, []);

  if (isLoading || data?.count === 0) {
    return null;
  }

  const slidePrev = () => {
    swiperRef.current.slidePrev();
  };

  const slideNext = () => {
    swiperRef.current.slideNext();
  };

  return (
    <div>
      {data?.count !== 0 && (
        <div>
          <div className='flex gap-4 mb-3'>
            <Typography size='base' text='인기리서치' weight='Semibold' />
            <div className='flex gap-4'>
              <button type='button' onClick={slidePrev}>
                <img src={prevBtn} alt='이전 버튼' />
              </button>
              <button type='button' onClick={slideNext}>
                <img src={nextBtn} alt='다음 버튼' />
              </button>
            </div>
          </div>
          <div className='h-full'>
            <Swiper
              spaceBetween={16}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              grabCursor
              centeredSlidesBounds
              breakpoints={{
                // 640px 이하에서 1개의 슬라이드
                0: {
                  slidesPerView: 1,
                },
                // 640px 이상 768px 이하에서 2개의 슬라이드
                748: {
                  slidesPerView: 2,
                },
                // 768px 이상 1024px 이하에서 3개의 슬라이드
                1082: {
                  slidesPerView: 3,
                },
                // 1024px 이상에서 4개의 슬라이드
                1464: {
                  slidesPerView: 4,
                },
              }}
            >
              {showLoader || isLoading
                ? // 스켈레톤 UI 렌더링
                  Array.from({ length: 4 }).map((_, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <SwiperSlide key={index}>
                      <CardSkeleton type='hot' />
                    </SwiperSlide>
                  ))
                : // 실제 데이터를 이용한 컨텐츠 렌더링
                  data.data.map(
                    ({
                      id,
                      title,
                      createdAt,
                      endDate,
                      viewCount,
                      researchTypes,
                    }: GetMainData) => (
                      <SwiperSlide key={id}>
                        <Card
                          id={id}
                          type='default'
                          enddate={formatDateString(endDate)}
                          onClick={() => navigate(`view/${id}`)}
                          cardStyle='hot'
                          createdAt={createdAt}
                          viewCount={Number(viewCount)}
                          onKeyDown={(
                            e: React.KeyboardEvent<HTMLDivElement>
                          ) => {
                            if (e.key === 'Enter' || e.key === 'Space') {
                              navigate(`/view/${id}`);
                            }
                          }}
                          researchTypes={researchTypes}
                        >
                          {title}
                        </Card>
                      </SwiperSlide>
                    )
                  )}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};
