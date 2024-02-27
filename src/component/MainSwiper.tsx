import React, { useRef, useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import prevBtn from '../stories/assets/ic_arrow_left.svg';
import nextBtn from '../stories/assets/ic_arrow_right.svg';
import { Badge } from '../stories/badge/Badge';
import { PageIndicator } from '../stories/indicator/page indicator/PageIndicator';
import Typography from '../stories/typography/Typography';

export const BannerSwiper = () => {
  const [totalSlides, settotalSlides] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // 페이지 인디케이터 배열 생성
  const pageIndicatorArr = Array.from({ length: totalSlides }, (_, index) => ({
    isActivate: index === activeIndex,
    pageNumber: index + 1,
  }));

  const handleSlideChangeTransitionEnd = () => {
    console.log('슬라이드 변경이 완료되었습니다.');
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
        <PageIndicator environment='desktop' page={pageIndicatorArr} />
      </div>
    </div>
  );
};

export const ResearchSwiper = () => {
  const swiperRef = useRef<Swiper | null>(null);

  const slidePrev = () => {
    swiperRef.current.slidePrev();
  };

  const slideNext = () => {
    swiperRef.current.slideNext();
  };

  return (
    <div>
      <div className='flex mb-3 gap-4'>
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
            <div className='w-full border border-[#C1C5CC] rounded-[16px]'>
              <button type='button' className='block w-full p-5'>
                <div className='flex items-center justify-between'>
                  <div className='flex'>
                    <Badge size='default' state='main'>
                      설문조사
                    </Badge>
                  </div>
                  <div>
                    <Badge size='default' state='sub'>
                      🔥Hot
                    </Badge>
                  </div>
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
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='w-full border border-[#C1C5CC] rounded-[16px]'>
              <button type='button' className='block w-full p-5'>
                <div className='flex items-center justify-between'>
                  <div className='flex'>
                    <Badge size='default' state='main'>
                      설문조사
                    </Badge>
                  </div>
                  <div>
                    <Badge size='default' state='sub'>
                      🔥Hot
                    </Badge>
                  </div>
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
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='w-full border border-[#C1C5CC] rounded-[16px]'>
              <button type='button' className='block w-full p-5'>
                <div className='flex items-center justify-between'>
                  <div className='flex'>
                    <Badge size='default' state='main'>
                      설문조사
                    </Badge>
                  </div>
                  <div>
                    <Badge size='default' state='sub'>
                      🔥Hot
                    </Badge>
                  </div>
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
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className='w-full border border-[#C1C5CC] rounded-[16px]'>
              <button type='button' className='block w-full p-5'>
                <div className='flex items-center justify-between'>
                  <div className='flex'>
                    <Badge size='default' state='main'>
                      설문조사
                    </Badge>
                  </div>
                  <div>
                    <Badge size='default' state='sub'>
                      🔥Hot
                    </Badge>
                  </div>
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
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='w-full border border-[#C1C5CC] rounded-[16px]'>
              <button type='button' className='block w-full p-5'>
                <div className='flex items-center justify-between'>
                  <div className='flex'>
                    <Badge size='default' state='main'>
                      설문조사
                    </Badge>
                  </div>
                  <div>
                    <Badge size='default' state='sub'>
                      🔥Hot
                    </Badge>
                  </div>
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
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
