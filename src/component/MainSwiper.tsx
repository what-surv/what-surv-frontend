import React, { useRef, useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import prevBtn from '../stories/assets/ic_arrow_left.svg';
import nextBtn from '../stories/assets/ic_arrow_right.svg';
import Card from '../stories/card/Card';
import { PageIndicator } from '../stories/indicator/page indicator/PageIndicator';
import Typography from '../stories/typography/Typography';

import { useNavigate } from 'react-router-dom';

export const BannerSwiper = () => {
  const [totalSlides, settotalSlides] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // 페이지 인디케이터 배열 생성
  const pageIndicatorArr = Array.from({ length: totalSlides }, (_, index) => ({
    isActivate: index === activeIndex,
    pageNumber: index + 1,
  }));

  const handleSlideChangeTransitionEnd = () => {
    // 여기에 슬라이드 변경 완료 후 수행할 작업 추가
  };

  return (
    <div>
      <div className='h-[312px] bg-[#E5E7ED]'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          grabCursor
          onInit={(totalIdx) => settotalSlides(totalIdx.slides.length)}
          onActiveIndexChange={(index) => setActiveIndex(index.realIndex)}
          onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
          speed={1200}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
        </Swiper>
      </div>
      <div className='flex justify-center'>
        <PageIndicator size='desktop' page={pageIndicatorArr} />
      </div>
    </div>
  );
};

export const ResearchSwiper = () => {
  const navigate = useNavigate();

  const swiperRef = useRef<Swiper | null>(null);

  const slidePrev = () => {
    swiperRef.current.slidePrev();
  };

  const slideNext = () => {
    swiperRef.current.slideNext();
  };

  return (
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
          spaceBetween={10}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          grabCursor
          centeredSlidesBounds
        >
          <SwiperSlide>
            <Card
              size='small'
              enddate='2024.02.28'
              onClick={() => navigate('view/0')}
            >
              asdasdasdasd
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
